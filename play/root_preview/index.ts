import "element-plus/dist/index.css";
import "@erye/vaf/dist/index.css";
import "../common/css/index.css";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import vaf, {
  createVafApp,
  installVafComponents,
  installVafProComponents,
} from "@erye/vaf";

import vafAppId from "../common/config/vafAppId";
import sidebarConfig from "../common/config/sidebar";
import navbarConfig from "../common/config/navbar";
import routeConfig from "../common/routes";
import AuthService from "../common/api/auth";

import installDirectives from "../common/directives";

console.log(JSON.stringify(vaf, null, 2));

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
