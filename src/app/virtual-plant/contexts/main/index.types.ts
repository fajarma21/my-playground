import type { ReactNode } from "react";
import { PlantData } from "@/app/virtual-plant/types";

interface BaseContext {
  plantData?: PlantData;
}

export interface MainProviderProps extends BaseContext {
  children: ReactNode;
  onSave: (data: PlantData) => void;
  onUpdatePlant: (data: PlantData) => void;
}

export interface MainContextValue extends BaseContext {
  handleSave: (data: PlantData) => void;
  handleUpdatePlant: (data: PlantData) => void;
}
