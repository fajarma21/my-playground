export interface PokeLS {
  id: number;
  name: string;
  nickname: string;
  queue: number;
  time: number;
}

export type EditMode = "" | "edit" | "release";
