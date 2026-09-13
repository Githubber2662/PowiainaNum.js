import { Config } from "bili";

const config: Config = {
  input: "src/index.ts",
  extendRollupConfig: (config) => {
    config.outputConfig.exports = "auto";
    return config;
  },
  output: {
    format: ["umd", "umd-min", "esm", "cjs"],
    moduleName: "PowiainaNum",
    sourceMap: false,
    fileName: (context, defaultFileName) => {
      switch (context.format) {
        case "umd":
          return context.minify ? "PowiainaNum.min.js" : "PowiainaNum.js";
        case "esm":
          return "PowiainaNum.esm.js";
        case "cjs":
          // Must end in `.cjs`: package.json sets "type": "module", so a `.js`
          // file is treated as ESM by Node and `require()` silently returns {}.
          return context.minify ? "PowiainaNum.min.cjs" : "PowiainaNum.cjs";
        default:
          return defaultFileName;
      }
    },
  },
};

export default config;
