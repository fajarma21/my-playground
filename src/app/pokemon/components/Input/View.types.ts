import { ChangeEvent } from "react";

export interface InputProps {
  className?: string;
  value: string;
  type: "text" | "number" | "search";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
