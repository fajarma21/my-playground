const getPokemonId = (id: string | number) => {
  const newId = String(id);
  if (newId.length === 1) return `00${newId}`;
  else if (newId.length === 2) return `0${newId}`;
  return newId;
};

export default getPokemonId;
