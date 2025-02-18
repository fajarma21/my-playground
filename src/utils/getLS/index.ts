import JsonParse from "../JsonParse";

const getLS = <T>(name: string): T | null => {
  const result = localStorage.getItem(name);
  return typeof result === "string" ? JsonParse(result) : result;
};

export default getLS;
