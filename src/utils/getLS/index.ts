const getLS = <T>(name: string): T | null => {
  const result = localStorage.getItem(name);
  return result ? JSON.parse(result) : result;
};

export default getLS;
