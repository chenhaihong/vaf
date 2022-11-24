import type { UserConfigFn } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mock from "./vite-plugin-mock";

const baseFn: UserConfigFn = () => {
  const config = {
    plugins: [vue(), vueJsx(), mock()],
  };
  return config;
};

export default baseFn;
