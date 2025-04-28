import MainImage from "./components/MainImage";
import { getPokemonData, getPokemons } from "./View.helpers";
import { PokemonDetailProps, PokemonListResult } from "./View.types";
import { PokemonData } from "@/app/pokemon/types";
import Content from "./components/Content";

const PokemonDetail = async ({ params }: PokemonDetailProps) => {
  const { name } = await params;
  const data: PokemonData = await getPokemonData(name);
  const { id = 0, moves = [], stats = [], types = [] } = data || {};

  return (
    <>
      {Boolean(id) && <MainImage id={id} name={name} />}
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

export async function generateStaticParams() {
  const list: PokemonListResult = await getPokemons();
  return list.results.map(({ name }) => ({ name }));
}

export default PokemonDetail;
