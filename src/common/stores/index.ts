import type { App } from "vue";

import { createPinia } from "pinia";

import createPersistedTokenPlugin from "./createPersistedTokenPlugin";

import { createUseAuthStore } from "./createUseAuthStore";
import { createUseSidebarStore } from "./createUseSidebarStore";
import { createUseHistoryBarStore } from "./createUseHistoryBarStore";
import { createUseNavbarStore } from "./createUseNavbarStore";

export { getUseAuthStore } from "./createUseAuthStore";
export { getUseSidebarStore } from "./createUseSidebarStore";
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
  const useSidebarStore = createUseSidebarStore(vafAppId, sidebarConfig);
  const useNavbarStore = createUseNavbarStore(vafAppId, navbarConfig);
  const useHistoryBarStore = createUseHistoryBarStore(vafAppId);
  useStores[vafAppId] = {
    [UseStoreNames.auth]: useAuthStore,
    [UseStoreNames.sidebar]: useSidebarStore,
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
  sidebar = "sidebar",
  navbar = "navbar",
  historyBar = "historyBar",
}
