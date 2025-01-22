const getCurrentPath = (value: string) => {
  const splitted = value.split("/");
  return splitted[splitted.length - 1];
};

export default getCurrentPath;
