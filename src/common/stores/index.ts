import type { App } from "vue";

import { createPinia } from "pinia";

import createPersistedTokenPlugin from "./createPersistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseLeftMenuStore } from "./createUseLeftMenuStore";
import { createUsePageHistoryStore } from "./createUseRouteHistoryStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseLeftMenuStore } from "./createUseLeftMenuStore";
export { getUsePageHistoryStore } from "./createUseRouteHistoryStore";

const pinias = {};
const useStores = {};

export default function installUseStores(app: App, options: Options) {
  const { vafAppId, leftmenuConfig = {}, dataFuncConfig = {} } = options;

  const pinia = createPinia();
  pinias[vafAppId] = pinia;

  pinia.use(createPersistedTokenPlugin(vafAppId));
  app.use(pinia);

  // 创建所有useStore, 并放进池子
  const useAuthStore = createUseAuthStore(vafAppId, dataFuncConfig);
  const useLeftmenuStore = createUseLeftMenuStore(vafAppId, leftmenuConfig);
  const useRouteHistoryStore = createUsePageHistoryStore(vafAppId);
  useStores[vafAppId] = {
    [UseStoreNames.auth]: useAuthStore,
    [UseStoreNames.leftmenu]: useLeftmenuStore,
    [UseStoreNames.routerPageHistory]: useRouteHistoryStore,
  };
}

export const getPinia = (vafAppId: string) => {
  return pinias[vafAppId];
};

export const getUseStores = (
  vafAppId: string,
  userStoreName: UseStoreNames
) => {
  return useStores[vafAppId][userStoreName];
};

interface Options {
  vafAppId: string;
  leftmenuConfig: any;
  dataFuncConfig: any;
}

enum UseStoreNames {
  auth = "auth",
  leftmenu = "leftmenu",
  routerPageHistory = "routerPageHistory",
}
