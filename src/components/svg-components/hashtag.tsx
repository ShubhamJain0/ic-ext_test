import React from 'react';

type Props = {
  fillColor?: string;
};

export const Hashtag: React.FC<Props> = ({ fillColor }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L8 21"
        stroke={fillColor || '#474A53'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 3L14 21"
        stroke={fillColor || '#474A53'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 9H21.5"
        stroke={fillColor || '#474A53'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 15H20.5"
        stroke={fillColor || '#474A53'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
