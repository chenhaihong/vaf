import NProgress from "nprogress";

import createAttachBeforeEach from "./createAttachBeforeEach";
import createAttachAfterEach from "./createAttachAfterEach";

// 完整的导航解析流程，请阅读文档
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B

const createAttachGlobalNavigationGuards =
  (vafAppId) => ($router, guards, routeConfig, settingConfig) => {
    // beforeeach 文档
    // https://router.vuejs.org/zh/api/#beforeeach
    if (!guards.beforeEach) {
      const { enableLoginFilter = true, enableRoleFilter = true } = routeConfig;
      createAttachBeforeEach(vafAppId)(
        $router,
        enableLoginFilter,
        enableRoleFilter
      );
    } else {
      // 如果用户自定义了守卫，则不添加内置的全局导航守卫，
      // 而是使用用户定义的导航守卫函数
      $router.beforeEach((to, from, next) => {
        // start progress bar
        NProgress.start();
        guards.beforeEach(to, from, next);
      });
    }

    // aftereach 文档
    // https://router.vuejs.org/zh/api/#aftereach
    if (!guards.afterEach) {
      createAttachAfterEach(vafAppId)($router, settingConfig);
    } else {
      // 如果用户自定义了守卫，则不添加内置的全局导航守卫，
      // 而是使用用户定义的导航守卫函数
      $router.afterEach((to, from) => {
        // finish progress bar
        NProgress.done();
        guards.afterEach(to, from);
      });
    }

    const rest = [
      // beforeResolve 文档
      // https://router.vuejs.org/zh/api/#beforeResolve
      "beforeResolve",
      // 将 onReady 改为 isReady
      // https://router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
      // isready 文档
      // https://router.vuejs.org/zh/api/#isready
      // "onReady", // router.onReady() 函数已被 router.isReady() 取代
      // onError 文档
      // https://router.vuejs.org/zh/api/#onerror
      "onError",
    ];
    rest.forEach((item) => {
      const fn = guards[item];
      if (fn) {
        $router[item](fn);
      }
    });
  };

export default createAttachGlobalNavigationGuards;
