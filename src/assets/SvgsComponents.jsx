import * as React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Animaciones individuales para cada path
const wave1Anim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); transform: scale(1.5); }
  100% { transform: translateY(0px); }
`;

const wave2Anim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-16px); transform: scale(1.5); }
  100% { transform: translateY(0px); }
`;

const wave3Anim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-18px); transform: scale(1.2); }
  100% { transform: translateY(0px); }
`;

const wave4Anim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); transform: scale(1.1); }
  100% { transform: translateY(0px); }
`;

const wave5Anim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(8px); transform: scale(1.1); }
  100% { transform: translateY(0px); }
`;

// Componentes styled para cada path con animaciones
const Path1 = styled("path")(() => ({
  animation: `${wave1Anim} 3s ease-in-out infinite`,
  transformOrigin: "center",
}));

const Path2 = styled("path")(() => ({
  animation: `${wave2Anim} 3.5s ease-in-out infinite 0.2s`,
  transformOrigin: "center",
}));

const Path3 = styled("path")(() => ({
  animation: `${wave3Anim} 4s ease-in-out infinite 0.4s`,
  transformOrigin: "center",
}));

const Path4 = styled("path")(() => ({
  animation: `${wave4Anim} 4.5s ease-in-out infinite 0.6s`,
  transformOrigin: "center",
}));

const Path5 = styled("path")(() => ({
  animation: `${wave5Anim} 5s ease-in-out infinite 0.8s`,
  transformOrigin: "center",
}));

export const AboutDivider = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 450"
    preserveAspectRatio="none"
    {...props}
  >
    <path fill="transparent" d="M0 0h900v600H0z" />
    <path
      fill={props.color || "#0A0A0A"}
      d="m0 88 11.2 19c11.1 19 33.5 57 55.6 69.3 22.2 12.4 44.2-1 66.4-17.5 22.1-16.5 44.5-36.1 66.8-9.8 22.3 26.3 44.7 98.7 66.8 153.2 22.2 54.5 44.2 91.1 66.4 78.1 22.1-13 44.5-75.6 66.8-113.5 22.3-37.8 44.7-50.8 66.8-39.3C489 239 511 275 533.2 250c22.1-25 44.5-111 66.8-116.2 22.3-5.1 44.7 70.5 66.8 122.7 22.2 52.2 44.2 80.8 66.4 79.7 22.1-1.2 44.5-32.2 66.8-53.4 22.3-21.1 44.7-32.5 66.8-15.3 22.2 17.2 44.2 62.8 66.4 88.5 22.1 25.7 44.5 31.3 66.8-26.5 22.3-57.8 44.7-179.2 66.8-178.5 22.2.7 44.2 123.3 66.4 187.8 22.1 64.5 44.5 70.9 66.8 46 22.3-24.8 44.7-80.8 66.8-132.5 22.2-51.6 44.2-99 66.4-71.5 22.1 27.5 44.5 129.9 66.8 141.4 22.3 11.5 44.7-67.9 66.8-73.2 22.2-5.3 44.2 63.3 66.4 43.7 22.1-19.7 44.5-127.7 66.8-161 22.3-33.4 44.7 8 66.8-.7 22.2-8.7 44.2-67.3 66.4-60.3 22.1 7 44.5 79.6 66.8 118.3 22.3 38.7 44.7 43.3 66.8 10.7C1889 167 1911 97 1933.2 99c22.1 2 44.5 76 55.6 113l11.2 37V0H0Z"
    />
  </svg>
);

export const AdminLoginBg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    preserveAspectRatio="none"
    {...props}
  >
    <path fill="#001220" d="M0 0h900v600H0z" />
    <Path1
      fill="#ff5fcf"
      d="m0 357 21.5 13C43 383 86 409 128.8 415c42.9 6 85.5-8 128.4-10 42.8-2 85.8 8 128.6 1.3 42.9-6.6 85.5-30 128.4-34.8 42.8-4.8 85.8 8.8 128.6 24.5 42.9 15.7 85.5 33.3 128.4 32.8 42.8-.5 85.8-19.1 107.3-28.5L900 391v210H0Z"
    />
    <Path2
      fill="#dd4cc6"
      d="m0 412 21.5 6.8c21.5 6.9 64.5 20.5 107.3 26.9 42.9 6.3 85.5 5.3 128.4-.7 42.8-6 85.8-17 128.6-22.2 42.9-5.1 85.5-4.5 128.4 3.4C557 434 600 449 642.8 447.5c42.9-1.5 85.5-19.5 128.4-28.7 42.8-9.1 85.8-9.5 107.3-9.6l21.5-.2v192H0Z"
    />
    <Path3
      fill="#b93bbd"
      d="m0 467 21.5-3.2c21.5-3.1 64.5-9.5 107.3-14.1 42.9-4.7 85.5-7.7 128.4-4.5 42.8 3.1 85.8 12.5 128.6 19.1 42.9 6.7 85.5 10.7 128.4 8.5 42.8-2.1 85.8-10.5 128.6-17.3 42.9-6.8 85.5-12.2 128.4-13.3 42.8-1.2 85.8 1.8 107.3 3.3L900 447v154H0Z"
    />
    <Path4
      fill="#932db3"
      d="m0 531 21.5-1.7c21.5-1.6 64.5-5 107.3-12.8 42.9-7.8 85.5-20.2 128.4-19.8C300 497 343 510 385.8 516c42.9 6 85.5 5 128.4-1.5C557 508 600 496 642.8 492.7c42.9-3.4 85.5 2 128.4 3.8 42.8 1.8 85.8.2 107.3-.7l21.5-.8v106H0Z"
    />
    <Path5
      fill="#6b21a8"
      d="m0 557 21.5 2.3c21.5 2.4 64.5 7 107.3 7.4 42.9.3 85.5-3.7 128.4-7.2 42.8-3.5 85.8-6.5 128.6-4.7 42.9 1.9 85.5 8.5 128.4 5 42.8-3.5 85.8-17.1 128.6-23.5 42.9-6.3 85.5-5.3 128.4.2C814 542 857 552 878.5 557l21.5 5v39H0Z"
    />
  </svg>
);
