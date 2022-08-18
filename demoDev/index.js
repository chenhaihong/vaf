import "element-plus/dist/index.css";
import "../demo/index.css";

import ElementPlus from "element-plus";
import vaf, {
  createVafApp,
  installVafComponents,
  installVafProComponents,
  getRequest,
} from "../src/index.js";

import vafAppId from "../demo/common/config/vafAppId";
import leftmenuConfig from "../demo/common/config/leftmenu";
import routeConfig from "../demo/common/routes";
import makeAuthService from "../demo/common/api/auth";

import installDirectives from "../demo/common/directives";

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
app.use(ElementPlus);
app.use(installVafProComponents);
app.use(installVafComponents);
app.use(installDirectives);
app.mount("#app");
