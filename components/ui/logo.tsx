import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export const Logo = (props: LogoProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 570.59 205.46"
    fill="currentColor"
    {...props}
  >
    <path d="M118.69,0L0,205.58h237.38L118.69,0ZM118.69,87.34l43.05,74.57h-86.1l43.05-74.57Z"/>
    <polygon points="570.59 -.12 451.9 205.46 333.21 -.12 383.63 -.12 451.9 118.11 520.16 -.12 570.59 -.12"/>
    <g>
      <path d="M297.92,161.83l-68.21-118.16h93.43L297.93,0h-143.88l118.69,205.58.08-.12,25.15-43.55h0s.04-.08.04-.08h-.09Z"/>
      <polygon points="298.01 161.83 297.97 161.9 297.93 161.84 297.93 161.83 298.01 161.83"/>
      <path d="M391.36,161.83h-93.43s-.01.01-.01.01l-25.18,43.62h143.81l-25.19-43.63Z"/>
    </g>
  </svg>
);