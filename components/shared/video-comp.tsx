import React from "react";

export default function VideoComponent(
  src: string,
  type: string,
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
) {
  return (
    <video {...props}>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
