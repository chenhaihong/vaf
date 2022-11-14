import "element-plus/dist/index.css";
import "../fixture/index.css";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import vaf, {
  createVafApp,
  installVafComponents,
  installVafProComponents,
  getRequest,
} from "../src/index.ts";

import vafAppId from "../fixture/common/config/vafAppId";
import sidebarConfig from "../fixture/common/config/sidebar";
import navbarConfig from "../fixture/common/config/navbar";
import routeConfig from "../fixture/common/routes";
import makeAuthService from "../fixture/common/api/auth";

import installDirectives from "../fixture/common/directives";

console.log(JSON.stringify(vaf, null, 2));

const AuthService = makeAuthService(vafAppId, getRequest);

const { app } = createVafApp({
  vafAppId,
  settingConfig: {
    name: "@erye/vaf",
    slogan: "方便、快捷、精准",
    logo: "https://map.tiiit.cn/deer.png",
    copyright: "本网站属于个人技术分享网站",
  },
  dataFuncConfig: {
    login: AuthService.login,
    getUserinfo: AuthService.getUserinfo,
    logout: AuthService.logout,
  },
  sidebarConfig,
  navbarConfig,
  routeConfig,
});
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(installVafProComponents);
app.use(installVafComponents);
app.use(installDirectives);
app.mount("#app");
