import path from "path";
import { defineConfig } from "vite";

import baseFn from "./vite.config.base";

const previewFn = defineConfig(() => {
  return {
    root: path.resolve(__dirname, "./fixturePreview"),
    base: "/",
    build: {
      outDir: path.resolve(__dirname, "./dist"),
      emptyOutDir: false,
      rollupOptions: {
        output: {
          manualChunks: {
            Vaf: [path.relative(__dirname, "./dist/vaf.es.js")], // 疑惑, js使用相对路径
            VafStyle: [path.resolve(__dirname, "./dist/index.css")], // 疑惑, css使用绝对路径
            ElementPlusIconsVue: ["@element-plus/icons-vue"],
            ElementPlus: ["element-plus"],
            ElementPlusLocaleZhCn: ["element-plus/es/locale/lang/zh-cn"],
            ElementPlusStyle: ["element-plus/dist/index.css"],
          },
          globals: {
            [path.relative(__dirname, "./dist/vaf.es.js")]: "Vaf", // 疑惑, js使用相对路径
            [path.resolve(__dirname, "./dist/index.css")]: "VafStyle", // 疑惑, css使用绝对路径
            "@element-plus/icons-vue": "ElementPlusIconsVue",
            "element-plus": "ElementPlus",
            "element-plus/es/locale/lang/zh-cn": "ElementPlusLocaleZhCn",
          },
        },
      },
    },
  };
});

export default Object.assign(baseFn(), previewFn());
