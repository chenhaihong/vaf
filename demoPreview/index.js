import "../demo/index.css";

import "../dist/index.css";
import vaf, { createVafApp, getRequest } from "../dist/vaf.es.js";

import vafAppId from "../demo/common/config/vafAppId";
import leftmenuConfig from "../demo/common/config/leftmenu";
import routeConfig from "../demo/common/routes";
import makeAuthService from "../demo/common/api/auth";

import installDirectives from "../demo/common/directives";

console.log(JSON.stringify(vaf, null, 2));

const AuthService = makeAuthService(vafAppId, getRequest);

const { app } = createVafApp({
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
