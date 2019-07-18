export const prepare = async () => {
  const { Component } = await import("./component");
  return Component;
};
