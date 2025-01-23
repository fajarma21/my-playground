import { ChangeEvent, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  type: "text" | "number" | "search";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
