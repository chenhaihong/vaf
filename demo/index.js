import "element-plus/dist/index.css";
import "./index.css";

import vaf, { createVafApp } from "../src/index.js";

import leftmenuConfig from "./common/config/leftmenu";
import routeConfig from "./common/routes";

import installDirectives from "./common/directives";

console.log(JSON.stringify(vaf, null, 2));

const { app } = createVafApp({
  settingConfig: {
    name: "Vue Admin Framework",
    slogan: "方便、快捷、精准",
    logo: "https://map.tiiit.cn/deer.png",
    copyright: "本网站属于个人技术分享网站",
  },
  apiConfig: {
    loginUrl: "/vaf-auth/login",
    getUserinfoUrl: "/vaf-auth/userinfo",
    logoutUrl: "/vaf-auth/logout",
  },
  leftmenuConfig,
  routeConfig,
  storeConfig: {},
});
app.use(installDirectives);
app.mount("#app");
