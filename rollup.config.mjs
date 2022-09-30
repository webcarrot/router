import typescript from "@rollup/plugin-typescript";

import dts from "rollup-plugin-dts";

const config = [
  {
    input: "./src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: ["react", "react/jsx-runtime"],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/index.cjs", format: "cjs" }],
    plugins: [typescript()],
    external: ["react", "react/jsx-runtime"],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "dist/index.mjs", format: "es" }],
    plugins: [typescript()],
    external: ["react", "react/jsx-runtime"],
  },
];

export default config;
