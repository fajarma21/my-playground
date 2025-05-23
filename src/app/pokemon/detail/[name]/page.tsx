import type { PokemonData } from '@/app/pokemon/types';
import { Suspense } from 'react';
import Content from './components/Content';
import MainImage from './components/MainImage';
import { getPokemonData } from './View.helpers';
import type { PokemonDetailProps } from './View.types';

const PokemonDetail = async ({ params }: PokemonDetailProps) => {
  const { name } = await params;
  const data: PokemonData = await getPokemonData(name);
  const { id = 0, moves = [], stats = [], types = [] } = data || {};

  return (
    <>
      {Boolean(id) && (
        <Suspense>
          <MainImage id={id} name={name} />
        </Suspense>
      )}
      <Content
        id={id}
        isError={false}
        isLoading={false}
        moves={moves}
        name={name}
        stats={stats}
        types={types}
      />
    </>
  );
};

export default PokemonDetail;
