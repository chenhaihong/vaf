import "element-plus/dist/index.css";
import "./index.css";

import vaf, { createVafApp, getRequest } from "../src/index.js";

import vafAppId from "./common/config/vafAppId";
import leftmenuConfig from "./common/config/leftmenu";
import routeConfig from "./common/routes";
import makeAuthService from "./common/api/auth";

import installDirectives from "./common/directives";

console.log(JSON.stringify(vaf, null, 2));

const AuthService = makeAuthService(vafAppId, getRequest);

const { app } = createVafApp({
  vafAppId,
  settingConfig: {
    name: "Vue Admin Framework",
    slogan: "方便、快捷、精准",
    logo: "https://map.tiiit.cn/deer.png",
    copyright: "本网站属于个人技术分享网站",
  },
  dataFuncConfig: {
    login: AuthService.login,
    getUserinfo: AuthService.getUserinfo,
    logout: AuthService.logout,
  },
  leftmenuConfig,
  routeConfig,
});
app.use(installDirectives);
app.mount("#app");
