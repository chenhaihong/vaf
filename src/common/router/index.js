import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import attachPageLayout from "./attachPageLayout";
import attachDefaultRoutes from "./attachDefaultRoutes";
import createAttachGlobalNavigationGuards from "./createAttachGlobalNavigationGuards";

// router实例池
// 为了让适用于达到创建多个VafApp的场景
const routers = {};

export const createMakeRouter =
  (vafAppId) =>
  (routeConfig = {}, settingConfig = {}) => {
    const {
      mode = "hash", // hash || history
      base = "/",
      pageRoutes = [],
      vanillaRoutes = [],
      globalNavigationGuards = {}, // 符合VueRouter约束的全局导航配置
    } = routeConfig;

    const attachedRoutes = attachDefaultRoutes([
      ...attachPageLayout(pageRoutes), // 植入了VafPageLayout的路由
      ...vanillaRoutes, // 原生的VueRouter的路由配置，不做额外处理
    ]);

    const $router = createRouter({
      history:
        mode === "hash" ? createWebHashHistory(base) : createWebHistory(base),
      routes: attachedRoutes,
      scrollBehavior: makeScrollBehavior(vafAppId),
    });

    createAttachGlobalNavigationGuards(vafAppId)(
      $router,
      globalNavigationGuards,
      settingConfig
    ); // 添加用户定义的全局导航守卫

    routers[vafAppId] = $router;
    return $router;
  };

export const getRouter = (vafAppId) => {
  return routers[vafAppId];
};

function makeScrollBehavior(vafAppId) {
  // 重置滚动位置到 {x: 0, y: 0}
  return () => {
    // VafPageLayout给容器设置了这个类名标识符, 通过他获取容器元素.
    const wrap = document.querySelector(".scrollbar__wrap--" + vafAppId);
    if (wrap) {
      wrap.scrollTo(0, 0);
    } else {
      return { x: 0, y: 0 };
    }
  };
}
