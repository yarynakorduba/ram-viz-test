import React from "react";

// direction: 'right' | 'left' | 'up' | 'down'

const ROTATION_MAP = {
  right: 0,
  left: 180,
  up: 270,
  down: 90,
};

const RoundArrow = ({ alt, size, direction = "down", variant = "bold", stroke = "inherit", ...props }) => (
  <svg
    data-view-icon="RoundChevron"
    aria-label={alt}
    width={size || 32}
    height={size || 32}
    viewBox="0 0 32 32"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      transform={`rotate(${ROTATION_MAP[direction]} 16 16)
        ${variant === "slim" ? "scale(0.65)" : "scale(0.625) translate(1 1)"}`}
    >
      <g>
        <g stroke={stroke} strokeWidth={variant === "slim" ? 1 : 3}>
          <circle cx={24} cy={24} r={23.5} fill="white" />
          <circle cx={24} cy={24} r={23.5} />
          <path
            fillRule="nonzero"
            d="M30.5961941 19.0961941L30.5961941 20.0961941 24.5961941 20.0961941 18.5961941 20.0961941 18.5961941 19.0961941z"
            transform="rotate(45 24.596 19.596)"
          />
          <path
            fillRule="nonzero"
            d="M24.0961941 21.5961941L25.0961941 21.5961941 25.0961941 33.5961941 24.0961941 33.5961941z"
            transform="rotate(45 24.596 27.596)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default RoundArrow;
