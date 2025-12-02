import NextImage from "next/image";
import type React from "react";

type ImageImportProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;

  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;

  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;

  objectFit?: React.CSSProperties["objectFit"];
};

export function ImageImport({
  src,
  alt,
  className,
  style,
  fill,
  width,
  height,
  sizes,
  priority,
  loading,
  quality,
  objectFit,
}: ImageImportProps) {
  const isExternal = /^https?:\/\//i.test(src);

  if (!isExternal) {
    return (
      <NextImage
        src={src}
        alt={alt}
        className={className}
        style={style}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        quality={quality}
      />
    );
  }

  const imgStyle: React.CSSProperties = {
    objectFit: objectFit ?? (fill ? "cover" : undefined),
    width: fill ? "100%" : width,
    height: fill ? "100%" : height,
    ...style,
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={imgStyle}
      loading={loading ?? "lazy"}
    />
  );
}
