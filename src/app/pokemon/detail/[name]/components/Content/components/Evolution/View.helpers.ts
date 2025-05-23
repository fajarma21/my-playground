import type { EvolveList, PokemonEvolutionData } from './View.types';

export const getAnyPokemonData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const mapEvolution = (
  evolveList: PokemonEvolutionData['chain'][],
  prevIndex = -1,
  newEvolveList: EvolveList[][] = []
) => {
  let speciesArr: EvolveList[][] = newEvolveList;
  for (let index = 0; index < evolveList.length; index++) {
    const element = evolveList[index];
    const { evolves_to = [], species } = element || {};
    const { name, url } = species || {};

    const newIndex = prevIndex + 1;
    if (!speciesArr[newIndex]) speciesArr.push([]);
    speciesArr[newIndex].push({
      name: name || '',
      url: url || '',
    });
    speciesArr = mapEvolution(evolves_to, newIndex, speciesArr);
  }

  return speciesArr;
};

export const mapChainEvolution = (chain?: PokemonEvolutionData['chain']) => {
  if (chain) return mapEvolution([chain]);
  return [];
};
