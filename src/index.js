import { createApp } from "vue";
import ElementPlus from "element-plus";

import { createMakeStore } from "@/common/store";
import { createMakeRouter } from "@/common/router";
import { makeRequest } from "@/common/helpers/request";
import { makeAuthService } from "@/common/api/AuthService";
import GlobalComponents from "@/componentsGlobal/GlobalComponents";

import VafApp from "./VafApp.vue";

export const createVafApp = (vafAppConfig = {}) => {
  const {
    vafAppId = "vaf-app", // 用来标记应用的唯一id，可以帮助拿到vaf\store\router
    apiConfig = {},
    leftmenuConfig = {},
    routeConfig = {},
    storeConfig = {},
    // slots = {}, // 暂不开放
  } = vafAppConfig;

  // for (let name in slots) {
  //   if (Object.prototype.hasOwnProperty.call(slots, name)) {
  //     const component = slots[name];
  //     Vue.component(name, component);
  //   }
  // }

  const app = createApp(VafApp);
  const store = createMakeStore(vafAppId)(storeConfig, leftmenuConfig); // 先创建store
  const router = createMakeRouter(vafAppId)(routeConfig); // 先创建router
  const request = makeRequest(vafAppId); // 再创建request
  const AuthService = makeAuthService(vafAppId, apiConfig); // 再创建AuthService

  app.config.globalProperties.$vafAppConfig = vafAppConfig;
  app.config.globalProperties.$vafAppId = vafAppId;
  app.config.globalProperties.$vafRequest = request;
  app.config.globalProperties.$vafAuthService = AuthService;

  app.use(ElementPlus);
  app.use(GlobalComponents);
  app.use(store);
  app.use(router);

  return app;
};

export { getStore } from "@/common/store";
export { getRouter } from "@/common/router";
export { getRequest } from "@/common/helpers/request";
export { getAuthService } from "@/common/api/AuthService";

export default {
  name: "vaf",
  version: "0.0.3",
  author: "erye",
};
