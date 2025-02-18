interface MaintenaceDetails {
  amount: number;
  lastTime?: Date;
}

interface StatusDetails {
  type: number;
  amount: number;
}

export interface PlantData {
  cycle: number[];
  name: string;
  type: number;
  startTime?: Date;
  age: number;
  health: number;
  stage: number;
  status: number;
  maintenance: Record<string, MaintenaceDetails>;
  statusDetails?: StatusDetails;
}

export interface GameData {
  name: string;
  lastSaved: Date;
}

export interface MainData {
  game: GameData;
  plant?: PlantData;
}
