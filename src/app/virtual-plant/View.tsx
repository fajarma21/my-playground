import React, { useCallback, useEffect, useState } from "react";

import getLS from "@/utils/getLS";
import setLS from "@/utils/setLS";

import { LS_PLANT } from "./constants";
import { MainProvider } from "./contexts/main";
import Plant from "./components/Plant";
import Footer from "./components/Footer";
import { GameData, MainData, PlantData } from "./types";

import styles from "./View.module.css";
import LeftSide from "./components/LeftSide";

const VirtualPlant = () => {
  const [gameData, setGameData] = useState<GameData>({
    name: "rffa",
    lastSaved: new Date(0),
  });
  const [plantData, setPlantData] = useState<PlantData>();

  const handleSave = useCallback(
    (data?: PlantData) => {
      if (gameData) {
        const mainData = {
          game: { ...gameData, lastSaved: new Date() },
          plant: data,
        };
        setLS(LS_PLANT, mainData);
      }
    },
    [gameData]
  );

  const handleUpdateGame = useCallback((data: GameData) => {
    setGameData(data);
  }, []);

  const handleUpdatePlant = useCallback((data?: PlantData) => {
    setPlantData(data);
  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", () => handleSave(plantData));

  //   return () => {
  //     window.removeEventListener("beforeunload", () => handleSave(plantData));
  //   };
  // }, [handleSave, plantData]);

  useEffect(() => {
    const loadData = getLS<MainData>(LS_PLANT);
    if (loadData) {
      const { plant, game } = loadData;
      if (plant) {
        const { startTime } = plant;
        if (startTime) {
          const age = Date.now() - new Date(startTime).getTime();
          const stage = plant.cycle.findIndex((item) => item > age);
          handleUpdatePlant({
            ...plant,
            age,
            stage: stage >= 0 ? stage : plant.cycle.length,
          });
        } else {
          handleUpdatePlant(plant);
        }
      }
      handleUpdateGame(game);
    }
  }, [handleUpdateGame, handleUpdatePlant]);

  return (
    <div className={styles.container}>
      <MainProvider
        plantData={plantData}
        onSave={handleSave}
        onUpdatePlant={handleUpdatePlant}
      >
        <LeftSide />
        <div className={styles.plantWrapper}>{plantData && <Plant />}</div>
        <Footer />
      </MainProvider>
    </div>
  );
};

export default VirtualPlant;
