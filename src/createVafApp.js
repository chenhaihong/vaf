import "@/common/style/index.scss";

import { createApp } from "vue";
import { vLoading } from "element-plus";

import installUseStores from "@/common/stores";
import { createMakeRouter } from "@/common/router";
import { makeRequest } from "@/common/helpers/request";
import installVafProComponents from "@/ProComponents";
import installVafComponents from "@/components";

import VafApp from "./VafApp.vue";

// vafApp实例池
const vafApps = {};

export const createVafApp = (vafAppConfig = {}) => {
  const {
    vafAppId = "vaf-app", // 用来标记应用的唯一id，可以帮助拿到vafapp\store\router\request
    settingConfig = {},
    dataFuncConfig = {},
    leftmenuConfig = {},
    routeConfig = {},
  } = vafAppConfig;

  const app = createApp(VafApp);
  app.use(installUseStores, { vafAppId, leftmenuConfig, dataFuncConfig });

  const router = createMakeRouter(vafAppId)(routeConfig, settingConfig); // 创建router
  const request = makeRequest(vafAppId); // 再创建request

  app.config.globalProperties.$vafAppConfig = vafAppConfig;
  app.config.globalProperties.$vafAppId = vafAppId;
  app.config.globalProperties.$vafRequest = request;

  app.directive("loading", vLoading);
  app.use(installVafProComponents);
  app.use(installVafComponents);
  app.use(router);

  vafApps[vafAppId] = app;
  return { app, router, request };
};

export const getVafApp = (vafAppId) => {
  return vafApps[vafAppId];
};
