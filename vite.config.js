import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VitePluginMock from "./vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [vue(), vueJsx(), VitePluginMock()],
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "@/common/scss/index.scss";` },
      },
      devSourcemap: true,
    },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };

  let commandConfig = {};
  if (command === "build") {
    commandConfig = getBuildConfig(mode);
  } else if (command === "serve") {
    commandConfig = getServeConfig(mode);
  }

  return { ...config, ...commandConfig };
});

function getServeConfig(mode) {
  let config = {
    server: {
      port: 3000,
    },
  };

  switch (mode) {
    case "development":
      config = {
        ...config,
        root: path.resolve(__dirname, "./demo"),
        base: "/",
      };
      break;
    case "development:lib":
      config = {
        ...config,
        root: path.resolve(__dirname, "./demoLib"),
        base: "/",
      };
      break;
  }

  return config;
}

function getBuildConfig(mode) {
  const isSourceMap = "production:sourcemap" === mode;
  const config = {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "Vaf",
        fileName: (format) => {
          const withMin = isSourceMap ? "" : ".min";
          return `vaf.${format + withMin}.js`;
        },
      },
      polyfillModulePreload: false,
      emptyOutDir: false,
      sourcemap: isSourceMap,
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
              const withMin = isSourceMap ? "" : ".min";
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
  return config;
}
