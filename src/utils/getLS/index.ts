import canUseDOM from "../canUseDOM";

const getLS = <T>(name: string): T | null => {
  if (canUseDOM) {
    const result = localStorage.getItem(name);
    return result ? JSON.parse(result) : (result as T | null);
  }
  return null;
};

export default getLS;
