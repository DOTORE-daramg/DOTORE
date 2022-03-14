import React from "react";

interface LogoProps {
  color?: string;
  size?: string;
}

export const Logo = ({ color, size }: LogoProps) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 77.000000 77.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,77.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none"
    >
      <path
        d="M452 738 c-6 -6 -48 -12 -104 -12 -72 -1 -103 -6 -139 -22 -53 -25
-113 -83 -127 -124 -9 -24 -7 -31 11 -48 72 -66 340 -154 511 -169 88 -7 101
3 99 83 -3 99 -78 197 -191 248 -45 20 -55 36 -22 36 11 0 20 5 20 10 0 14
-43 13 -58 -2z"
      />
      <path
        d="M76 468 c-11 -43 -6 -184 9 -235 19 -64 64 -125 117 -160 24 -15 45
-31 49 -35 12 -18 138 -1 192 26 80 39 177 151 202 234 6 20 3 22 -28 22 -115
0 -461 104 -518 156 -15 13 -17 13 -23 -8z"
      />
    </g>
  </svg>
);
