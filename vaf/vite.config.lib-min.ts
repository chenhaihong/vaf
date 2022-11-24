import type { UserConfigFn } from "vite";

import { resolve } from "path";
import { defineConfig } from "vite";
import deepmerge from "deepmerge";

import baseFn from "./vite.config.base";
import { libFn } from "./vite.config.lib";

const minFn: UserConfigFn = () => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
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
            return assetInfo.name as string;
          },
        },
      },
    },
  };
};

export default defineConfig((env) => {
  return deepmerge.all([baseFn(env), libFn(env), minFn(env)]);
});
