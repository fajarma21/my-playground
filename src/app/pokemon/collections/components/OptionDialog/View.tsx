import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Button from "@/app/pokemon/components/Button";
import Input from "@/app/pokemon/components/Input";
import PokeDialog from "@/app/pokemon/components/PokeDialog";

import { OptionDialogProps } from "./View.types";

const OptionDialog = (props: OptionDialogProps) => {
  const { name, nickname, mode, onEdit, onRelease } = props;
  const displayName = nickname || name;

  const [inputValue, setInputValue] = useState(nickname);

  useEffect(() => {
    setInputValue(nickname);
  }, [nickname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitNickname = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(inputValue);
  };

  return (
    <PokeDialog {...props} name={displayName} subTitle={name}>
      {mode === "edit" ? (
        <>
          {nickname ? <p>Change the nickname?</p> : <p>Give it nickname?</p>}
          <form id="myform" onSubmit={handleSubmitNickname}>
            <Input type="text" value={inputValue} onChange={handleChange} />
          </form>
          <Button type="submit" form="myform">
            {nickname && !inputValue
              ? "Remove the nickname"
              : nickname === inputValue
              ? "Nope"
              : "Looks good!"}
          </Button>
        </>
      ) : (
        <>
          <p>You wanna release this pokemon?</p>
          <Button color="red" onClick={onRelease}>
            Be free, <b>{displayName}</b>!
          </Button>
        </>
      )}
    </PokeDialog>
  );
};

export default OptionDialog;
