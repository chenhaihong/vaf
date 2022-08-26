import "@/common/style/index.scss";

import { createApp } from "vue";

import installUseStores from "@/common/stores";
import { createMakeRouter } from "@/common/router";
import { makeRequest } from "@/common/helpers/request";

import VafApp from "./VafApp.vue";

// vafApp实例池
const vafApps = {};

export const createVafApp = (vafAppConfig = {}) => {
  const {
    vafAppId = "vaf-app", // 用来标记应用的唯一id，可以帮助拿到vafapp\store\router\request
    settingConfig = {},
    dataFuncConfig = {},
    sidebarConfig = {},
    navbarConfig = {},
    routeConfig = {},
  } = vafAppConfig;

  const app = createApp(VafApp);
  vafApps[vafAppId] = app;

  app.use(installUseStores, {
    vafAppId,
    sidebarConfig,
    dataFuncConfig,
    navbarConfig,
  }); // 先创建store
  const router = createMakeRouter(vafAppId)(routeConfig, settingConfig); // 先创建router
  const request = makeRequest(vafAppId); // 再创建request
  app.use(router);

  app.config.globalProperties.$vafAppConfig = vafAppConfig;
  app.config.globalProperties.$vafAppId = vafAppId;
  app.config.globalProperties.$vafRequest = request;

  return { app, router, request };
};

export const getVafApp = (vafAppId) => {
  return vafApps[vafAppId];
};
