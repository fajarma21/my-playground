import React, {
  CSSProperties,
  unstable_ViewTransition as ViewTransition,
} from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./View.module.css";
import { PokeThumbnailProps } from "./View.types";

const PokeThumbnail = ({
  href,
  imgSrc,
  imgSize,
  priority,
  text,
  viewTransition = "",
  width = 0,
}: PokeThumbnailProps) => {
  const fullWidth = width + 28;
  const style = {
    width: width ? fullWidth : "auto",
    height: width ? fullWidth : 180,
    "--name-max": `${imgSize}px`,
  } as CSSProperties;
  return (
    <Link href={href} className={styles.thumbnail} style={style}>
      {viewTransition ? (
        <ViewTransition name={viewTransition}>
          <Image
            src={imgSrc}
            alt={text}
            width={imgSize}
            height={imgSize}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </ViewTransition>
      ) : (
        <Image
          src={imgSrc}
          alt={text}
          width={imgSize}
          height={imgSize}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      )}

      <p>{text}</p>
    </Link>
  );
};

export default PokeThumbnail;
