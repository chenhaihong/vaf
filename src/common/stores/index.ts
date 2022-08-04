import { App } from "vue";

import { createPinia } from "pinia";

import createPersistedTokenPlugin from "./createPersistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseLeftMenuStore } from "./createUseLeftMenuStore";
import { createUsePageHistoryStore } from "./createUseRouteHistoryStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseLeftMenuStore } from "./createUseLeftMenuStore";
export { getUsePageHistoryStore } from "./createUseRouteHistoryStore";

const pinias = {};
export default function installUseStores(app: App, options: Options) {
  const { vafAppId, leftmenuConfig = {}, dataFuncConfig = {} } = options;

  const pinia = createPinia();
  pinias[vafAppId] = pinia;

  pinia.use(createPersistedTokenPlugin(vafAppId));
  app.use(pinia);

  // 创建所有useStore
  createUseAuthStore(vafAppId, dataFuncConfig);
  createUseLeftMenuStore(vafAppId, leftmenuConfig);
  createUsePageHistoryStore(vafAppId);
}

export const getPinia = (vafAppId: string) => {
  return pinias[vafAppId];
};

interface Options {
  vafAppId: string;
  leftmenuConfig: any;
  dataFuncConfig: any;
}
