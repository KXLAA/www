"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

export function BlurImage(props: ImageProps) {
  const [isLoading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} transition-all ${
        isLoading
          ? "grayscale blur-lg scale-100"
          : "grayscale-0 blur-0 scale-100"
      }`}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAADJJREFUGFcBJwDY/wHS/+3/3QDHAO4A+wABxv/d/9TzwQDxAgcAAaX/u//Tt8gA9P0OAMiwFiDLe9QcAAAAAElFTkSuQmCC"
      onLoadingComplete={async () => {
        setLoading(false);
      }}
    />
  );
}
