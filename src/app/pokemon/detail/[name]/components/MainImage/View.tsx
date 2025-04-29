"use client";

import React from "react";
import Image from "next/image";

import getPokemonImg from "@/app/pokemon/utils/getPokemonImg";

import ImageWrapper from "./components/ImageWrapper";
import { MainImageProps } from "./View.types";
import ThumbWrapper from "@/components/ThumbWrapper";

const MainImage = ({ id, name }: MainImageProps) => {
  return (
    <ImageWrapper id={id} name={name}>
      <ThumbWrapper viewTransition={`${name}-thumbnail`}>
        <Image
          priority
          src={getPokemonImg(id)}
          alt={name}
          height={300}
          width={300}
        />
      </ThumbWrapper>
    </ImageWrapper>
  );
};

export default MainImage;
