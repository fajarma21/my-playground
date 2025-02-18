import React, { CSSProperties, useEffect, useRef } from "react";
import { useMainContext } from "@/app/virtual-plant/contexts/main";

import styles from "./View.module.css";

const Plant = () => {
  const { plantData, handleSave, handleUpdatePlant } = useMainContext();
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (plantData) {
      const { age, cycle, stage, maintenance } = plantData;
      const { water } = maintenance;
      if (water.amount < 30) return;
      let newStage = stage;
      const cycleTime = cycle[newStage];
      if (cycleTime) {
        timerRef.current = setInterval(() => {
          const newAge = age + cycleTime;
          if (newAge >= cycleTime) newStage += 1;

          const newPlantData = {
            ...plantData,
            age: newAge,
            stage: newStage,
          };
          handleUpdatePlant(newPlantData);
          handleSave(newPlantData);
        }, cycleTime);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleSave, handleUpdatePlant, plantData]);

  return (
    <div className={styles.plantContainer}>
      {plantData && (
        <div
          className={styles.plant}
          style={{ "--stage": plantData.stage } as CSSProperties}
        >
          {plantData.stage}
          {plantData.age}
        </div>
      )}
    </div>
  );
};

export default Plant;
