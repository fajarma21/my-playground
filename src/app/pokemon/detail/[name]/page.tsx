import MainImage from "./components/MainImage";
import { getPokemonData } from "./View.helpers";
import { PokemonDetailProps } from "./View.types";
import { PokemonData } from "@/app/pokemon/types";
import Content from "./components/Content";
import { Suspense } from "react";

// export async function generateStaticParams() {
//   const list: PokemonListResult = await getPokemons();
//   return list.results.map(({ name }) => ({ name }));
// }

export async function generateStaticParams() {
  return [];
}

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
