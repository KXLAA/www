"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { cx } from "@/lib/cx";

export function BlurImage(props: ImageProps) {
  const [isLoading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={cx(
        "transition-all rounded-full",
        isLoading
          ? "grayscale blur-lg scale-100"
          : "grayscale-0 blur-0 scale-100",
        props.className
      )}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAADJJREFUGFcBJwDY/wHS/+3/3QDHAO4A+wABxv/d/9TzwQDxAgcAAaX/u//Tt8gA9P0OAMiwFiDLe9QcAAAAAElFTkSuQmCC"
      onLoad={async () => {
        setLoading(false);
      }}
    />
  );
}
