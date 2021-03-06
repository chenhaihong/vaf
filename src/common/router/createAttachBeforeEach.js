import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import { getStore } from "@/common/store";

// NProgress Configuration
NProgress.configure({
  minimum: 0.5, // Changes the minimum percentage used upon starting. (default: 0.08).
  showSpinner: false, // Turn off loading spinner by setting it to false.
  trickleRate: 0.2, // how much to increase per trickle.
  trickleSpeed: 800, // how often to trickle, in ms.
});

const attachVafBeforeEach = (vafAppId) => ($router) => {
  $router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    const $store = getStore(vafAppId);
    const token = $store.state.VafAuth?.token;
    const routeRoles = to.meta?.VafAuthRoles || [];
    let VafAuthLevel = to.meta?.VafAuthLevel; // 0=>可匿名访问 | 1=>需登录(默认) | 2=>需鉴别角色
    if (![0, 1, 2].includes(VafAuthLevel)) {
      VafAuthLevel = 1; // 修正权限等级
    }

    // 1 未登录
    if (!token) {
      // 1.1 登录页
      if ("/login" === to.path) next();
      // 1.2 这个路由可以匿名访问
      else if (0 === VafAuthLevel) next();
      // 1.3 需登录才能访问 || 需鉴别权限后才能访问
      else if ([1, 2].includes(VafAuthLevel)) {
        const pathHash = encodeURIComponent(encodeURIComponent(to.fullPath));
        next(`/login?redirect=${pathHash}`);
      }
      // 1.4 其他情况
      else {
        next("/403");
      }
    }
    // 2 已经登录
    else {
      // 2.1 登录页
      if ("/login" === to.path) next("/");
      // 2.2 这个路由可以匿名访问
      else if (0 === VafAuthLevel) next();
      // 2.3 需登录才能访问 || 需鉴别权限后才能访问
      else if ([1, 2].includes(VafAuthLevel)) {
        // 2.3.1 未拉取用户信息，则拉取用户信息
        if (!$store.state.VafAuth?.userinfo?.username) {
          const [err, data] = await $store.dispatch("VafAuth/getUserinfo");

          // 2.3.1.1 拉取信息失败
          if (err) {
            return next("/500");
          }
          // 2.3.1.2 拉取信息成功
          //         更新本地信息(在action里做更新信息操作)，走分支2.3.2
          // else {
          // }
        }

        // 2.3.2 已拉取用户信息
        {
          // 2.3.2.1 登录可访问 || 有访问权限
          if (
            1 === VafAuthLevel || // 登录可访问
            hasIntersect(routeRoles, $store.state.VafAuth?.roles) // 有访问权限，即用户角色与路由配置角色有交集
          ) {
            next();
          }
          // 2.3.2.2 无访问权限
          else next("/403");
        }
      }
      // 2.4 其他情况
      else {
        next("/403");
      }
    }
  });
};

// 2个数组是否有交集
function hasIntersect(a, b) {
  if (Array.isArray(a) && a.length && Array.isArray(b) && b.length) {
    for (const item of a) {
      if (b.includes(item)) return true;
    }
  }
  return false;
}

export default attachVafBeforeEach;
