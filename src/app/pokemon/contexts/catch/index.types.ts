import type { ReactNode } from "react";

export interface CatchProviderProps {
  children: ReactNode;
  onChangeCatchNew: (value: boolean) => void;
}

export interface CatchContextValue {
  handleChangeCatchNew: (value: boolean) => void;
}
