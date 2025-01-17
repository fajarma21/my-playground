import { StaticImageData } from "next/image";

export interface PokeThumbnailProps {
  href: string;
  imgSize: number;
  imgSrc: string | StaticImageData;
  priority?: boolean;
  text: string;
  width?: number;
}
