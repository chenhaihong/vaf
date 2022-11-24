import type { UserConfigFn } from "vite";

import { resolve } from "path";

import deepmerge from "deepmerge";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import legacy from "@vitejs/plugin-legacy";

import baseFn from "./vite.config.base";

const previewFn: UserConfigFn = () => {
  return {
    preview: {
      port: 8080,
      open: true,
    },
    root: resolve(__dirname, "./root_preview"),
    base: "/",
    plugins: [legacy(), splitVendorChunkPlugin()],
    build: {
      minify: false,
      outDir: resolve(__dirname, "./dist"),
      emptyOutDir: true,
    },
  };
};

export default defineConfig((env) => {
  return deepmerge.all([baseFn(env), previewFn(env)]);
});
