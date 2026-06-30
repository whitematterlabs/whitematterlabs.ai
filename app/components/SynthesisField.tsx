"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SafeCanvas } from "./SafeCanvas";

/* ---------------------------------------------------------------------------
   Synthesis field — a living spectrum aurora. A flat, viewport-filling quad
   whose fragment shader domain-warps simplex noise over screen space to bloom
   and merge the White Matter Labs spectrum forever. Autonomous (no pointer),
   radially faded into the light paper at its rim, with a subtle animated grain
   strongest in the saturated core. Replaces the old PAI orbit system.
--------------------------------------------------------------------------- */

// keep in sync with the @theme tokens, the CSS --spectrum in app/globals.css,
// and the SPECTRUM array in GradientFlow.tsx
const SPECTRUM: [number, number, number][] = [
  [0.878, 0.325, 0.106], // flare  #E0531B
  [0.957, 0.662, 0.235], // amber  #F4A93C
  [0.882, 0.114, 0.455], // rose   #E11D74
  [0.753, 0.121, 0.682], // magenta#C01FAE
  [0.529, 0.188, 0.808], // violet #8730CE
  [0.4, 0.0, 0.776], // purple #6600C6
  [0.184, 0.224, 0.663], // indigo #2F39A9
  [0.059, 0.357, 0.804], // azure  #0F5BCD
];

// pass-through: no displacement, expose UV only
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColors[8];
  varying vec2 vUv;

  // Ashima simplex noise 3D — sampled in 2D screen space here (not to displace)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+1.0*C.xxx;
    vec3 x2=x0-i2+2.0*C.xxx;
    vec3 x3=x0-1.0+3.0*C.xxx;
    i=mod(i,289.0);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=1.0/7.0;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // 8-stop spectrum ramp (same pattern as GradientFlow.tsx)
  vec3 ramp(float t){
    t=clamp(t,0.0,1.0)*7.0;
    int i=int(floor(t));
    float f=fract(t);
    vec3 a=uColors[0];vec3 b=uColors[1];
    if(i==0){a=uColors[0];b=uColors[1];}
    else if(i==1){a=uColors[1];b=uColors[2];}
    else if(i==2){a=uColors[2];b=uColors[3];}
    else if(i==3){a=uColors[3];b=uColors[4];}
    else if(i==4){a=uColors[4];b=uColors[5];}
    else if(i==5){a=uColors[5];b=uColors[6];}
    else {a=uColors[6];b=uColors[7];}
    return mix(a,b,smoothstep(0.0,1.0,f));
  }

  // cheap per-pixel hash for grain
  float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main(){
    float t = uTime * 0.04; // ~one slow evolution per ~30s
    float u = vUv.x;        // 0 (left, taper) → 1 (right, fans off-edge)
    float v = vUv.y;

    // ribbon geometry: a tapering, curving silk band. It narrows to a point on
    // the left (near the headline) and fans wide to the right, bleeding off the
    // edge — a free flowing form, not a square canvas of color.
    float curve = snoise(vec3(u * 1.4 - t, t * 0.5, 0.0)) * 0.14;
    float center = 0.5 + sin(u * 2.0 - 0.6) * 0.10 + curve;

    // width grows toward the right; organic wobble keeps the edge silky
    float width = mix(0.03, 0.5, smoothstep(0.0, 0.9, u));
    width *= 1.0 + 0.25 * snoise(vec3(u * 2.2 + t, 4.0, 0.0));

    float band = smoothstep(width, width * 0.18, abs(v - center));

    // a thinner inner strand offset from the core gives the silk its depth
    float center2 = center + 0.10 + 0.05 * snoise(vec3(u * 2.6 + t, 8.0, 0.0));
    float band2 = smoothstep(width * 0.45, 0.0, abs(v - center2)) * 0.5;

    float alpha = clamp(band + band2, 0.0, 1.0);

    // taper the left tip to nothing; let the right bleed off the frame
    alpha *= smoothstep(0.0, 0.12, u);

    // color: sweep the spectrum along and across the ribbon so it travels
    // through several brand hues as it fans, like the reference silk
    float warp = snoise(vec3(vUv * 1.5 + vec2(0.0, t), t * 0.6));
    float hue = u * 0.7 + (v - center) * 0.6 + warp * 0.2 + t * 0.5;
    vec3 col = ramp(fract(hue));

    // subtle grain — present in the lit ribbon, gone in the paper
    float grain = hash(vUv * 900.0 + fract(uTime) * 100.0) - 0.5;
    col += grain * 0.05 * alpha;

    gl_FragColor = vec4(col, alpha);
  }
`;

function Field() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColors: { value: SPECTRUM.map((c) => new THREE.Color(...c)) },
    }),
    []
  );

  useFrame((state) => {
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  // a unit quad scaled to exactly fill the frame, so vUv maps 1:1 to the
  // canvas at any aspect ratio (the ribbon stays correctly placed when the
  // container is wide-and-short on mobile or tall on desktop)
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* Animated CSS radial gradient used when WebGL is unavailable — soft brand
   bloom that also fades to transparent at the edge so it blends into paper.
   Honors the global prefers-reduced-motion rule in globals.css. */
function SynthesisFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 38%, #0f5bcd 47%, #8730ce 56%, #e11d74 66%, #f4a93c 76%, transparent 92%)",
          backgroundSize: "200% 200%",
          animation: "synthribbon 30s ease-in-out infinite alternate",
        }}
      />
      <style>{`@keyframes synthribbon{0%{background-position:30% 40%}100%{background-position:70% 60%}}`}</style>
    </div>
  );
}

export function SynthesisField() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-full w-full" aria-hidden="true" />;

  return (
    <SafeCanvas fallback={<SynthesisFallback />}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        aria-hidden="true"
      >
        <Field />
      </Canvas>
    </SafeCanvas>
  );
}
