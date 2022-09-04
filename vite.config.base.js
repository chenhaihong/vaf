import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Mock from "./vite-plugin-mock";

export default defineConfig(() => {
  const config = {
    plugins: [vue(), vueJsx(), Mock()],
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "@/common/scss/index.scss";` },
      },
      devSourcemap: true,
    },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
  return config;
});
