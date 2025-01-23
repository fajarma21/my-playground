const getFirstName = (value: string) => {
  return value.replace(/-.*/, "");
};

export default getFirstName;
