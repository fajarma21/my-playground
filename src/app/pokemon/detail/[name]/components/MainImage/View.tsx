"use client";

import React, { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";

import getPokemonImg from "@/app/pokemon/utils/getPokemonImg";

import ImageWrapper from "./components/ImageWrapper";
import { MainImageProps } from "./View.types";

const MainImage = ({ id, name }: MainImageProps) => {
  return (
    <ImageWrapper id={id} name={name}>
      <ViewTransition name={`${name}-thumbnail`}>
        <Image
          priority
          src={getPokemonImg(id)}
          alt={name}
          height={300}
          width={300}
        />
      </ViewTransition>
    </ImageWrapper>
  );
};

export default MainImage;
