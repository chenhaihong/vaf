import { App } from "vue";

import { createPinia } from "pinia";

import createPersistedTokenPlugin from "./createPersistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseLeftMenuStore } from "./createUseLeftMenuStore";
import { createUsePageHistoryStore } from "./createUseRouteHistoryStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseLeftMenuStore } from "./createUseLeftMenuStore";
export { getUsePageHistoryStore } from "./createUseRouteHistoryStore";

const pinia = createPinia();
export default function installUseStores(app: App, options: Options) {
  const { vafAppId, leftmenuConfig = {}, dataFuncConfig = {} } = options;

  pinia.use(createPersistedTokenPlugin(vafAppId));
  app.use(pinia);

  // 创建所有useStore
  createUseAuthStore(vafAppId, dataFuncConfig);
  createUseLeftMenuStore(vafAppId, leftmenuConfig);
  createUsePageHistoryStore(vafAppId);
}

interface Options {
  vafAppId: string;
  leftmenuConfig: any;
  dataFuncConfig: any;
}
