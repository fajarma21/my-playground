"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import getLS from "@/utils/getLS";
import setLS from "@/utils/setLS";
import useDisplayIntersect from "@/utils/useDisplayIntersect";
import Pokeball from "@/app/pokemon/components/Pokeball";
import getPokemonImg from "@/app/pokemon/utils/getPokemonImg";
import { PokeLS } from "@/app/pokemon/types";
import { COLLECTION_DEFAULT, LS_POKEMON } from "@/app/pokemon/constants";
import { useCatchContext } from "@/app/pokemon/contexts/catch";

import CatchDialog from "./components/CatchDialog";
import FloatingBall from "./components/FloatingBall";
import styles from "./View.module.css";
import { MainImageProps } from "./View.types";

const MainImage = ({ id, name }: MainImageProps) => {
  const searchParams = useSearchParams();
  const cID = searchParams.get("c");

  const { handleChangeCatchNew } = useCatchContext();

  const [displayCatch, setDisplayCatch] = useState(false);

  const [throwing, setThrowing] = useState(false);
  const [catchTime, setCatchTime] = useState(0);
  const [catchSuccess, setCatchSuccess] = useState(false);
  const [isCatched, setIsCatched] = useState(false);

  const [collectionData, setCollectionData] =
    useState<PokeLS>(COLLECTION_DEFAULT);
  const isCollection = Boolean(collectionData.id);

  const pokeStorage = useMemo(() => getLS<PokeLS[]>(LS_POKEMON) || [], []);
  const catched = pokeStorage.some((item) => item.id === id);

  useEffect(() => {
    const numberCID = Number(cID);
    if (!Number.isNaN(numberCID)) {
      const data = pokeStorage.find((item) => item.queue === numberCID);
      if (data) setCollectionData(data);
    }
  }, [cID, pokeStorage]);

  const handleCloseDialog = (nickname = "") => {
    setThrowing(false);
    setCatchSuccess(false);
    setDisplayCatch(false);
    handleChangeCatchNew(true);
    setIsCatched(true);

    const newData = {
      id,
      name,
      nickname,
      time: new Date().getTime(),
    };
    if (pokeStorage.length) {
      setLS(LS_POKEMON, [
        ...pokeStorage,
        { ...newData, queue: pokeStorage[pokeStorage.length - 1].queue + 1 },
      ]);
    } else {
      setLS(LS_POKEMON, [{ ...newData, queue: 1 }]);
    }
  };

  const handleCatch = () => {
    setThrowing(true);

    const randomTime = Math.ceil(Math.random() * 3000);
    const isSuccess = Boolean(randomTime % 2);
    setCatchTime(randomTime);

    setTimeout(() => {
      setCatchSuccess(isSuccess);
      setTimeout(() => {
        setCatchTime(0);
        if (!isSuccess) {
          setThrowing(false);
          setCatchSuccess(false);
        } else setDisplayCatch(true);
      }, 3000);
    }, randomTime);
  };

  const { ref: imgRef, intersecting } = useDisplayIntersect({ threshold: 0.7 });

  return (
    <>
      {isCollection && (
        <div className={styles.collectionRow}>
          <h3>{collectionData.nickname || collectionData.name}</h3>
          <p>{dayjs(collectionData.time).format("DD/MM/YY/ HH:mm:ss")}</p>
        </div>
      )}
      <div ref={imgRef} className={styles.imgWrapper}>
        <Image
          priority
          src={getPokemonImg(id)}
          alt={name}
          height={300}
          width={300}
          className={catchTime || catchSuccess ? styles.imgModifier : ""}
        />
        {(isCatched || catched) && !isCollection && (
          <div className={styles.catched} title="Already in collection">
            <Pokeball />
          </div>
        )}
        {Boolean(catchTime) && (
          <div className={styles.throwedPokeball}>
            <Pokeball />
          </div>
        )}
      </div>

      {!isCollection && (
        <>
          <FloatingBall
            display={intersecting}
            throwing={throwing}
            onClickBall={handleCatch}
          />

          <CatchDialog
            display={displayCatch}
            id={id}
            name={name}
            onClose={handleCloseDialog}
          />
        </>
      )}
    </>
  );
};

export default MainImage;
