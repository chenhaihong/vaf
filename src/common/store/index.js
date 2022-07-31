import { createStore } from "vuex";

import makeAuthModule from "./makeAuthModule";
import makeLeftmenModule from "./makeLeftmenModule";
import makeRouteHistoryModule from "./makeRouteHistoryModule";

import makePersistedStatePlugin from "./makePersistedStatePlugin";

// store实例池
// 为了让适用于达到创建多个VafApp的场景
const stores = {};

export const createMakeStore =
  (vafAppId) =>
  (storeConfig = {}, leftmenuConfig = {}, dataFuncConfig = {}) => {
    const { modules = {}, plugins = [], ...rest } = storeConfig;

    const VafAuth = makeAuthModule(dataFuncConfig);
    const VafLeftmenu = makeLeftmenModule(vafAppId, leftmenuConfig);
    const VafRouteHistory = makeRouteHistoryModule(vafAppId);

    const $store = createStore({
      modules: { VafAuth, VafLeftmenu, VafRouteHistory, ...modules }, // 植入内置的vuex模块
      plugins: [makePersistedStatePlugin(vafAppId), ...plugins], // 植入内置的vuex插件
      ...rest,
    });

    // 放进实例池中
    stores[vafAppId] = $store;

    return $store;
  };

export const getStore = (vafAppId) => {
  return stores[vafAppId];
};
