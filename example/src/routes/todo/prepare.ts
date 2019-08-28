export const prepare = async () =>
  import("./component").then(({ Component }) => Component);
