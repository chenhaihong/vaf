import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Mock from "./vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx?$/, /\.tsx?$/],
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx?$/, /\.tsx?$/],
      }),
      Mock(),
    ],
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
    if (mode === "preview") {
      commandConfig = getBuildPreviewConfig();
    } else {
      commandConfig = getBuildConfig(mode);
    }
  } else if (command === "serve") {
    commandConfig = getServeConfig(mode);
  } else if (command === "preivew") {
    commandConfig = getPreviewConfig();
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
        root: path.resolve(__dirname, "./demoDev"),
        base: "/",
      };
      break;
    case "development:lib":
      config = {
        ...config,
        root: path.resolve(__dirname, "./demoPreview"),
        base: "/",
      };
      break;
  }

  return config;
}

function getBuildConfig(mode) {
  const isMinified = "production:minified" === mode;
  const config = {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "Vaf",
        formats: ["es", "umd"],
        fileName: (format) => {
          const withMin = isMinified ? ".min" : "";
          return `vaf.${format + withMin}.js`;
        },
      },
      emptyOutDir: false,
      minify: isMinified,
      polyfillModulePreload: false,
      sourcemap: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          "axios",
          "element-plus",
          "nprogress",
          "pinia",
          "vue",
          "vue-router",
        ],
        output: {
          name: "Vaf",
          exports: "named",
          dir: path.resolve(__dirname, "./dist"),
          // Library Mode: support custom output css file name #8115
          // https://github.com/vitejs/vite/issues/8115
          assetFileNames: (chunkInfo) => {
            if (chunkInfo.name === "style.css") {
              const withMin = isMinified ? ".min" : "";
              return `index${withMin}.css`;
            }
          },
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            axios: "axios",
            "element-plus": "ElementPlus",
            nprogress: "NProgress",
            pinia: "Pinia",
            vue: "Vue",
            "vue-router": "VueRouter",
          },
        },
      },
    },
  };
  return config;
}

function getPreviewConfig() {
  let config = {
    preview: {
      port: 3000,
    },
    root: path.resolve(__dirname, "./demoLib"),
    base: "/",
  };
  return config;
}

function getBuildPreviewConfig() {
  const config = {
    root: path.resolve(__dirname, "./demoPreview"),
    base: "/",
    build: {
      outDir: path.resolve(__dirname, "./dist"),
    },
  };
  return config;
}
