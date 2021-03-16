import { ImageLoaderProps } from "next/image";

export function imageLoader(props: ImageLoaderProps): string {
  const { src, width, quality } = props;

  return `https://app.feelja.com/_next/image?url=${encodeURIComponent(
    src
  )}&w=${width}&q=${quality}`;
}
