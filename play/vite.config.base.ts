import type { UserConfigFn } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const baseFn: UserConfigFn = () => {
  const config = {
    plugins: [vue(), vueJsx()],
  };
  return config;
};

export default baseFn;
