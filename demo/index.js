// ? 由内部引入，还是由使用者引入
import "element-plus/dist/index.css";
import "./index.css";

// TODO 将uniapp的条件编译使用到这里来
let vaf, createVafApp, module;
if (import.meta.env.MODE === "development:lib") {
  import("../dist/style.css");
  module = import.meta.globEager("../dist/vaf.es.js")["../dist/vaf.es.js"];
} else {
  module = import.meta.globEager("../src/index.js")["../src/index.js"];
}
vaf = module.default;
createVafApp = module.createVafApp;

import leftmenuConfig from "./index.leftmenuConfig";
import routeConfig from "./index.routeConfig";

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
  // slots: {
  //   // 暂时不开放
  //   // vaf内部需要使用拿到的组件.
  //   // 内部逻辑将其他们注册为全局组件，
  //   VafNavbarUser: defineComponent({}),
  // },
});
vafApp.mount("#app");
