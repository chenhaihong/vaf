import type { UserConfigFn } from "vite";

import { resolve } from "path";

import deepmerge from "deepmerge";
import { defineConfig } from "vite";

import baseFn from "./vite.config.base";

const devFn: UserConfigFn = () => {
  return {
    server: { port: 3000 },
    root: resolve(__dirname, "root_dev"),
    base: "/",
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "@/common/scss/index.scss";` },
      },
      devSourcemap: true,
    },
    resolve: {
      alias: [
        // vaf目录下的模块指定了@目录别名为vaf/src目录。
        {
          find: "@",
          replacement: resolve(__dirname, "..", "vaf/src"),
        },
        // root_dev/index.ts里引入了@erye/vaf，这里需要设置好别名。
        {
          find: "@erye/vaf",
          replacement: resolve(__dirname, "..", "vaf/src/index.ts"),
        },
      ],
    },
  };
};

export default defineConfig((env) => {
  return deepmerge.all([baseFn(env), devFn(env)]);
});
