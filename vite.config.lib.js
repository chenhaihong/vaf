import path from "path";
import { defineConfig } from "vite";

import baseFn from "./vite.config.base";

const libFn = defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "Vaf",
        formats: ["es", "umd"],
        fileName: (format) => {
          return `vaf.${format}.js`;
        },
      },
      emptyOutDir: false,
      minify: false,
      polyfillModulePreload: false,
      sourcemap: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          "@element-plus/icons-vue",
          "axios",
          "element-plus",
          "element-plus/es/locale/lang/zh-cn",
          "element-plus/dist/index.css",
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
          // https://github.com/vitejs/vite/issues/8115#issuecomment-1124815005
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") {
              return `index.css`;
            }
            return assetInfo.name;
          },
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            "@element-plus/icons-vue": "ElementPlusIconsVue",
            axios: "axios",
            "element-plus": "ElementPlus",
            "element-plus/es/locale/lang/zh-cn": "ElementPlusLocaleZhCn",
            "element-plus/dist/index.css": "",
            nprogress: "NProgress",
            pinia: "Pinia",
            vue: "Vue",
            "vue-router": "VueRouter",
          },
        },
      },
    },
  };
});

export default Object.assign(baseFn(), libFn());
