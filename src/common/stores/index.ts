import type { App } from "vue";

import { createPinia } from "pinia";

import createPersistedTokenPlugin from "./createPersistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseLeftMenuStore } from "./createUseLeftMenuStore";
import { createUseHistoryBarStore } from "./createUseHistoryBarStore";
import { createUseNavbarStore } from "./createUseNavbarStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseLeftMenuStore } from "./createUseLeftMenuStore";
export { getUseHistoryBarStore } from "./createUseHistoryBarStore";
export { getUseNavbarStore } from "./createUseNavbarStore";

const pinias = {};
const useStores = {};

export default function installUseStores(app: App, options: Options) {
  const {
    vafAppId,
    dataFuncConfig = {},
    sidebarConfig = {},
    navbarConfig = {},
  } = options;

  const pinia = createPinia();
  pinias[vafAppId] = pinia;

  pinia.use(createPersistedTokenPlugin(vafAppId));
  app.use(pinia);

  // 创建所有useStore, 并放进池子
  const useAuthStore = createUseAuthStore(vafAppId, dataFuncConfig);
  const useLeftmenuStore = createUseLeftMenuStore(vafAppId, sidebarConfig);
  const useNavbarStore = createUseNavbarStore(vafAppId, navbarConfig);
  const useHistoryBarStore = createUseHistoryBarStore(vafAppId);
  useStores[vafAppId] = {
    [UseStoreNames.auth]: useAuthStore,
    [UseStoreNames.leftmenu]: useLeftmenuStore,
    [UseStoreNames.navbar]: useNavbarStore,
    [UseStoreNames.historyBar]: useHistoryBarStore,
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
  dataFuncConfig: any;
  sidebarConfig: any;
  navbarConfig: any;
}

enum UseStoreNames {
  auth = "auth",
  leftmenu = "leftmenu",
  navbar = "navbar",
  historyBar = "historyBar",
}
