import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import makeAuthModule from "./makeAuthModule";
import makeLeftmenModule from "./makeLeftmenModule";
import makePersistedStatePlugin from "./makePersistedStatePlugin";

// store实例池
// 为了让适用于达到创建多个VafApp的场景
const stores = {};

export const createMakeStore =
  (vafAppId) =>
  (storeConfig = {}, leftmenuConfig = {}) => {
    const { modules = {}, plugins = [], ...rest } = storeConfig;

    const VafAuth = makeAuthModule(vafAppId);
    const VafLeftmenu = makeLeftmenModule(leftmenuConfig);

    const $store = createStore({
      modules: { VafAuth, VafLeftmenu, ...modules }, // 植入内置的vuex模块
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
