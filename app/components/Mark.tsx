/**
 * The White Matter Labs "WЖ" monogram, taken verbatim from the brand SVG.
 * `fill` defaults to currentColor so it inherits text color in context.
 */
export function Mark({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="290 255 220 290"
      className={className}
      role="img"
      aria-label="White Matter Labs"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fill}
        d="M343.67 399.989L305.333 270H344.685L362.457 349.974H363.473L384.545 270H415.519L436.591 350.227H437.607L455.379 270H494.731L456.394 399.989L494.731 529.978H455.379L437.607 450.004H436.591L415.519 529.978H384.545L363.472 449.75H362.457L344.685 529.978H305.333L343.67 399.989ZM400.54 327.378L422.628 399.989L400.54 472.6H399.524L377.436 399.989L399.524 327.378H400.54Z"
      />
    </svg>
  );
}
