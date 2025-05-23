import type { PokeLS } from '@/app/pokemon/types';

export interface CatchedIconProps {
  catchId: string | null;
  display: boolean;
  id: number;
  storage: PokeLS[];
  handleAddCollection: (arg: PokeLS) => void;
}
