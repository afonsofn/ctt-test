import React from "react";

export const EditIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    className="btn-icon"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      d="M15.232 5.232L18.768 8.768M16 3.5L5 14.5V19h4.5L20.5 8 16 3.5z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
