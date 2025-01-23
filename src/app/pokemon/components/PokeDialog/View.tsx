import React from "react";
import Image from "next/image";

import getPokemonImg from "@/app/pokemon/utils/getPokemonImg";
import Dialog from "@/components/Dialog";

import styles from "./View.module.css";
import { PokeDialogProps } from "./View.types";

const PokeDialog = ({
  display,
  id,
  name,
  children,
  subTitle,
  onClose,
}: PokeDialogProps) => {
  return (
    <Dialog
      display={display}
      className={styles.dialog}
      overlayClassName={styles.dialogOverlay}
      onClose={onClose}
    >
      <div className={styles.container}>
        <Image
          src={getPokemonImg(id)}
          alt={name}
          height={200}
          width={200}
          className={styles.imgModifier}
        />
        <h2 className={styles.title}>{name}</h2>
        {Boolean(subTitle) && <p className={styles.subTitle}>{subTitle}</p>}
        <div className={styles.inner}>{children}</div>
      </div>
    </Dialog>
  );
};

export default PokeDialog;
