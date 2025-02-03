import { ChangeEvent } from "react";

export interface UploadBtnProps {
  display: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
