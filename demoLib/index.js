import "element-plus/dist/index.css";
import "../demo/index.css";

import "../dist/index.css";
import vaf, { createVafApp } from "../dist/vaf.es.js";

import leftmenuConfig from "../demo/common/config/leftmenu";
import routeConfig from "../demo/common/routes";

console.log(JSON.stringify(vaf, null, 2));

const vafApp = createVafApp({
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
vafApp.mount("#app");
