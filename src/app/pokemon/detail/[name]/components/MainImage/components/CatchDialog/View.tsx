import React, { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/app/pokemon/components/Button";
import Input from "@/app/pokemon/components/Input";
import PokeDialog from "@/app/pokemon/components/PokeDialog";

import { CatchDialogProps } from "./View.types";

const CatchDialog = (props: CatchDialogProps) => {
  const { name, onClose } = props;
  const [nickname, setNickname] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose(nickname);
  };

  return (
    <PokeDialog {...props} subTitle="has been caught!">
      <p>Wanna give it a nickname?</p>
      <form id="myform" onSubmit={handleSubmit}>
        <Input type="text" value={nickname} onChange={handleChange} />
      </form>
      <Button type="submit" form="myform">
        {nickname ? (
          "Looks good!"
        ) : (
          <>
            Just <b>{name}</b>
          </>
        )}
      </Button>
    </PokeDialog>
  );
};

export default CatchDialog;
