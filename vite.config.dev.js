import path from "path";
import { defineConfig } from "vite";

import base from "./vite.config.base";

const dev = defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    root: path.resolve(__dirname, "./fixtureDev"),
    base: "/",
  };
});

export default Object.assign(base(), dev());
