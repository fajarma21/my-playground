export interface GetPokemonListParams {
  pageParam: unknown;
}

export interface PokemonListData {
  next: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}
