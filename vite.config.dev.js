import path from "path";
import { defineConfig } from "vite";

import baseFn from "./vite.config.base";

const devFn = defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    root: path.resolve(__dirname, "./fixtureDev"),
    base: "/",
  };
});

export default Object.assign(baseFn(), devFn());
