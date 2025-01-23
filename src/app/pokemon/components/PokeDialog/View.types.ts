import { ReactNode } from "react";

export interface PokeDialogProps {
  children: ReactNode;
  display: boolean;
  id: number;
  name: string;
  subTitle?: string;
  onClose: () => void;
}
