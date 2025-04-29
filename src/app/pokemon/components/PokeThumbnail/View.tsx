import React, { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import ThumbWrapper from "../../../../components/ThumbWrapper";
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
      <ThumbWrapper viewTransition={viewTransition}>
        <Image
          src={imgSrc}
          alt={text}
          width={imgSize}
          height={imgSize}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </ThumbWrapper>

      <p>{text}</p>
    </Link>
  );
};

export default PokeThumbnail;
