function JsonParse<T>(value: string): T {
  let finalValue = value || "{}";
  if (typeof finalValue !== "string") finalValue = "{}";
  return JSON.parse(finalValue);
}

export default JsonParse;
