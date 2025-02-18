import React from "react";
import { useMainContext } from "@/app/virtual-plant/contexts/main";
import styles from "./View.module.css";

const Footer = () => {
  const { plantData, handleSave, handleUpdatePlant } = useMainContext();

  const handleClickPlant = () => {
    const plant = {
      name: "Planty",
      type: 1,
      age: 0,
      health: 100,
      stage: 1,
      status: 1,
      maintenance: {
        water: {
          amount: 0,
        },
        fertilizer: {
          amount: 0,
        },
        pesticide: {
          amount: 0,
        },
      },
      cycle: [0, 10000, 3600000, 86400000, 432000000],
    };

    handleUpdatePlant(plant);
    handleSave(plant);
  };

  const handleClickWater = () => {
    if (plantData) {
      handleUpdatePlant({
        ...plantData,
        startTime: plantData.age ? new Date() : undefined,
        maintenance: {
          ...plantData.maintenance,
          water: {
            amount: 100,
            lastTime: new Date(),
          },
        },
      });
    }
  };

  const buttons = [
    {
      disabled: Boolean(plantData),
      text: "Plant",
      onClick: handleClickPlant,
    },
    {
      disabled: !plantData,
      text: "Water",
      onClick: handleClickWater,
    },
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.buttonContainer}>
        {buttons.map((item) => (
          <button
            key={item.text}
            type="button"
            disabled={item.disabled}
            className={styles.navBtn}
            onClick={item.onClick}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Footer;
