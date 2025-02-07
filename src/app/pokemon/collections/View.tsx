"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

import getLS from "@/utils/getLS";
import setLS from "@/utils/setLS";
import getFirstName from "@/app/pokemon/utils/getFirstName";
import { COLLECTION_DEFAULT, LS_POKEMON } from "../constants";
import getPokemonImg from "../utils/getPokemonImg";
import { EditMode, PokeLS } from "../types";

import OptionDialog from "./components/OptionDialog";
import EmptyState from "./components/EmptyState";
import styles from "./View.module.css";
import Link from "next/link";

const Collections = () => {
  const [data, setData] = useState<PokeLS[]>([]);
  const [selectedData, setSelectedData] = useState<PokeLS>(COLLECTION_DEFAULT);

  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<EditMode>("");

  const handleOpenEdit = (
    e: MouseEvent<HTMLButtonElement>,
    mode: EditMode,
    value: PokeLS
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setDialogMode(mode);
    setSelectedData(value);
    setDisplayDialog(true);
  };

  const handleCloseDialog = () => {
    setDisplayDialog(false);
  };

  const handleEdit = (value = "") => {
    const newData = data.map((item) => {
      if (item.queue === selectedData.queue) {
        return {
          ...item,
          nickname: value,
        };
      }
      return item;
    });

    setData(newData);
    setLS(LS_POKEMON, newData);

    handleCloseDialog();
  };

  const handleRelease = () => {
    const newData = data.filter((item) => item.queue !== selectedData.queue);
    setData(newData);
    setLS(LS_POKEMON, newData);

    handleCloseDialog();
  };

  useEffect(() => {
    setData(getLS(LS_POKEMON) || []);
  }, []);

  return (
    <>
      <h1>Collections ({data.length})</h1>
      {data.length ? (
        <ul className={styles.collections}>
          {data.map((item) => (
            <li
              key={item.time}
              role="button"
              tabIndex={0}
              className={styles.item}
            >
              <Link href={`/pokemon/detail/${item.name}?c=${item.queue}`}>
                <div className={styles.btnContainer}>
                  <button
                    type="button"
                    title="Edit"
                    className={styles.btnIcon}
                    onClick={(e) => handleOpenEdit(e, "edit", item)}
                  >
                    <div className={styles.editIcon} />
                  </button>
                  <button
                    type="button"
                    title="Release"
                    className={styles.btnIcon}
                    onClick={(e) => handleOpenEdit(e, "release", item)}
                  >
                    <div className={styles.releaseIcon} />
                  </button>
                </div>
                <Image
                  priority
                  src={getPokemonImg(item.id)}
                  alt={String(item.time)}
                  width={100}
                  height={100}
                />
                <p className={styles.name}>
                  <b>{item.nickname || getFirstName(item.name)}</b>
                </p>
                <p>
                  <small>{dayjs(item.time).format("DD/MM/YY/ HH:mm:ss")}</small>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState />
      )}

      <OptionDialog
        {...selectedData}
        name={getFirstName(selectedData.name)}
        display={displayDialog}
        mode={dialogMode}
        onClose={handleCloseDialog}
        onEdit={handleEdit}
        onRelease={handleRelease}
      />
    </>
  );
};

export default Collections;
