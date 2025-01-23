const BASE_URL = "/pokemon/detail/";

const getPokemonUrl = (name: string, id: number) => {
  return BASE_URL + name.includes("-") ? id : name;
};

export default getPokemonUrl;
