"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SafeCanvas } from "./SafeCanvas";

/* ---------------------------------------------------------------------------
   Fluid spectrum surface
   A high-subdivision plane displaced by domain-warped simplex noise (vertex)
   and shaded with a flowing pass through the White Matter Labs spectrum
   (fragment). Reads as liquid silk in the brand colors.
--------------------------------------------------------------------------- */

const SPECTRUM: [number, number, number][] = [
  [0.878, 0.325, 0.106], // flare  #E0531B
  [0.957, 0.662, 0.235], // amber  #F4A93C
  [0.882, 0.114, 0.455], // rose   #E11D74
  [0.753, 0.121, 0.682], // magenta#C01FAE
  [0.529, 0.188, 0.808], // violet #8730CE
  [0.400, 0.0, 0.776], // purple #6600C6
  [0.184, 0.224, 0.663], // indigo #2F39A9
  [0.059, 0.357, 0.804], // azure  #0F5BCD
];

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElev;

  // Ashima simplex noise 3D
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

  void main(){
    vUv=uv;
    vec3 pos=position;
    float t=uTime*0.11;
    // gentle domain warp — keep frequencies low so the surface rolls like
    // liquid silk rather than spiking into faceted peaks
    float warp=snoise(vec3(pos.x*0.16+t*0.5, pos.y*0.16-t*0.4, t*0.4));
    float elev=
        snoise(vec3(pos.x*0.20+warp*0.45, pos.y*0.18+t, t*0.3))*0.55
      + snoise(vec3(pos.x*0.38-t*0.2, pos.y*0.34+warp*0.3, t*0.35))*0.16;
    elev+=uMouse.x*0.10*sin(pos.y*0.25+t);
    pos.z+=elev;
    vElev=elev;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColors[8];
  varying vec2 vUv;
  varying float vElev;

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

  void main(){
    float t=uTime*0.06;
    // flowing coordinate that sweeps the spectrum across the surface
    float flow=vUv.x*0.62 + vUv.y*0.28 + vElev*0.18 + t
             + 0.10*sin(vUv.y*6.2831+uTime*0.25)
             + uMouse.x*0.06;
    vec3 col=ramp(fract(flow));

    // soft sheen from elevation — the silk highlight, kept subtle so it
    // doesn't outline every ridge
    float sheen=smoothstep(0.1,0.8,vElev);
    col+=sheen*0.07;
    // gentle vignette toward lower-left so white type stays legible
    float vig=smoothstep(1.15,0.15,distance(vUv,vec2(0.62,0.62)));
    col=mix(col*0.92,col,vig);

    gl_FragColor=vec4(col,1.0);
  }
`;

function FlowSurface() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColors: { value: SPECTRUM.map((c) => new THREE.Color(...c)) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    mouse.current.lerp(target.current, 0.04);
    const m = matRef.current;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uMouse.value.copy(mouse.current);
  });

  // oversize the plane so the tilted surface always covers the frame
  const w = Math.max(viewport.width, viewport.height) * 2.2;

  return (
    <mesh rotation={[-0.62, 0, 0.18]} position={[0.2, -0.3, 0]} scale={1}>
      <planeGeometry args={[w, w, 220, 220]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* Static spectrum used when WebGL is unavailable — animated via CSS so the
   hero still feels alive without a GPU context. */
function Fallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 75% 20%, #e0531b 0%, #e11d74 22%, #c01fae 38%, #8730ce 54%, #6600c6 68%, #2f39a9 84%, #0f5bcd 100%)",
          backgroundSize: "180% 180%",
          animation: "flowfallback 18s ease-in-out infinite alternate",
        }}
      />
      <style>{`@keyframes flowfallback{0%{background-position:0% 50%}100%{background-position:100% 50%}}`}</style>
    </div>
  );
}

export function GradientFlow() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* base layer is always painted so there is never a blank frame */}
      <Fallback />
      {ready && (
        <SafeCanvas fallback={null}>
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 42 }}
              gl={{ antialias: true, alpha: false }}
              dpr={[1, 2]}
            >
              <color attach="background" args={["#0f0a1a"]} />
              <FlowSurface />
            </Canvas>
          </div>
        </SafeCanvas>
      )}
    </div>
  );
}
