import { defineConfig } from "vite";
import merge from "merge";

import lib from "./vite.config.lib";

const minFn = defineConfig(() => {
  return {
    build: {
      lib: {
        fileName: (format) => {
          return `vaf.${format}.min.js`;
        },
      },
      minify: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") {
              return `index.min.css`;
            }
            return assetInfo.name;
          },
        },
      },
    },
  };
});

export default merge.recursive(lib, minFn());
