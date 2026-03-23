import React from "react";

export default function ImageBox({ src, alt, sx }) {
  return (
    <img
      className="w-full h-full object-cover"
      src={src}
      alt={alt}
      style={sx}
    />
  );
}
