const setLS = (name: string, data: unknown) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export default setLS;
