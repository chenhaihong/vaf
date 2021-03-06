import "@/common/style/index.scss";

import { createApp } from "vue";
import ElementPlus from "element-plus";

import { createMakeStore } from "@/common/store";
import { createMakeRouter } from "@/common/router";
import { makeRequest } from "@/common/helpers/request";
import { makeAuthService } from "@/common/api/AuthService";
import installVafProComponents from "@/ProComponents";
import installVafComponents from "@/components";

import VafApp from "./VafApp.vue";

export default {
  name: "@erye/vaf",
  version: "0.0.8",
  author: "erye",
};

// vafApp实例池
const vafApps = {};

export const createVafApp = (vafAppConfig = {}) => {
  const {
    vafAppId = "vaf-app", // 用来标记应用的唯一id，可以帮助拿到vaf\store\router
    settingConfig = {},
    apiConfig = {},
    leftmenuConfig = {},
    routeConfig = {},
    storeConfig = {},
  } = vafAppConfig;

  const app = createApp(VafApp);
  const store = createMakeStore(vafAppId)(storeConfig, leftmenuConfig); // 先创建store
  const router = createMakeRouter(vafAppId)(routeConfig, settingConfig); // 再创建router
  const request = makeRequest(vafAppId); // 再创建request
  const AuthService = makeAuthService(vafAppId, apiConfig); // 再创建AuthService

  app.config.globalProperties.$vafAppConfig = vafAppConfig;
  app.config.globalProperties.$vafAppId = vafAppId;
  app.config.globalProperties.$vafRequest = request;
  app.config.globalProperties.$vafAuthService = AuthService;

  app.use(ElementPlus);
  app.use(installVafProComponents);
  app.use(installVafComponents);
  app.use(store);
  app.use(router);

  vafApps[vafAppId] = app;
  return { app, router, store, request, AuthService };
};

export const getVafApp = (vafAppId) => {
  return vafApps[vafAppId];
};

export { getStore } from "@/common/store";
export { getRouter } from "@/common/router";
export { getRequest } from "@/common/helpers/request";
export { getAuthService } from "@/common/api/AuthService";
export {
  default as installVafProComponents,
  VafProForm,
  VafProTable,
} from "@/ProComponents";
export {
  default as installVafComponents,
  VafEcharts,
  VafFragment,
} from "@/components";
