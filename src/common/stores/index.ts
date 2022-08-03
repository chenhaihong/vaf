import { App } from "vue";

import { createPinia } from "pinia";

import persistedTokenPlugin from "./persistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseLeftMenuStore } from "./createUseLeftMenuStore";
import { createUsePageHistoryStore } from "./createUseRouteHistoryStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseLeftMenuStore } from "./createUseLeftMenuStore";
export { getUsePageHistoryStore } from "./createUseRouteHistoryStore";

const pinia = createPinia();
export default function installVafUseStores(app: App, options: Options) {
  const { vafAppId, leftmenuConfig = {}, dataFuncConfig = {} } = options;

  pinia.use(persistedTokenPlugin(vafAppId));
  app.use(pinia);

  // 创建所有useStore
  createUseLeftMenuStore(vafAppId, leftmenuConfig);
  createUseAuthStore(vafAppId, dataFuncConfig);
  createUsePageHistoryStore(vafAppId);
}

interface Options {
  vafAppId: string;
  leftmenuConfig: any;
  dataFuncConfig: any;
}
