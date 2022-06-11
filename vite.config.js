import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VitePluginVafMockAuth from "./vite-plugin-vaf-mock-auth";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);

  return {
    root: path.resolve(__dirname, "./demo"),
    base: "/",
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      VitePluginVafMockAuth(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/common/scss/index.scss";`,
        },
      },
      devSourcemap: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "Vaf",
        fileName: (format) => {
          const withMin = "build:development" === mode ? "" : ".min";
          return `vaf.${format + withMin}.js`;
        },
      },
      polyfillModulePreload: false,
      emptyOutDir: false,
      sourcemap: "build:development" === mode,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          "axios",
          "element-plus",
          "nprogress",
          "vue",
          "vue-router",
          "vuex",
          "vuex-persistedstate",
        ],
        output: {
          name: "Vaf",
          exports: "named",
          dir: path.resolve(__dirname, "./dist"),
          // Library Mode: support custom output css file name #8115
          // https://github.com/vitejs/vite/issues/8115
          assetFileNames: (chunkInfo) => {
            if (chunkInfo.name === "style.css") {
              const withMin = "build:development" === mode ? "" : ".min";
              return `index${withMin}.css`;
            }
          },
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            axios: "Vue",
            "element-plus": "ElementPlus",
            nprogress: "NProgress",
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            "vuex-persistedstate": "createPersistedState",
          },
        },
      },
    },
  };
});
