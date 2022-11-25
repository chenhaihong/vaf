import type { UserConfigFn } from "vite";

import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const baseFn: UserConfigFn = () => {
  const config = {
    plugins: [vue(), vueJsx()],
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
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
  };
  return config;
};

export default baseFn;
