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

/**
 * ==================================================================================
 * 路由拦截逻辑 - 方式1 (不采用)
 * ==================================================================================
 * 1 这个路由可以匿名访问
 *   1.1 用户未登录       next()
 *   1.2 用户已经登录
 *       2.1.1 登录页     next('/')
 *       2.1.2 其他页面   next()
 * 2 需登录才能访问
 *   2.1 用户未登录
 *       2.1.1 登录页     next()
 *       2.1.2 其他页面   next(`/login?redirect=${fromHash}`)
 *   2.2 用户已经登录
 *       2.2.1 登录页     next('/')
 *       2.2.2 其他页面
 *             2.2.2.1 拉取信息失败   next('/500')，在request中处理错误提示
 *             2.2.2.2 拉取信息成功   next()
 * 3 需鉴别权限后才能访问
 *   3.1 用户未登录
 *       3.1.1 登录页     next()
 *       3.1.2 其他页面   next(`/login?redirect=${fromHash}`)
 *   3.2 用户已经登录
 *       3.2.1 登录页     next('/')
 *       3.2.2 未拉取用户信息
 *            3.2.2.1 拉取信息失败   next('/500')，在request中处理错误提示
 *            3.2.2.2 拉取信息成功   更新本地信息，走分支3.2.3
 *       3.2.3 拉取成功
 *            3.2.3.1 有访问权限   next()
 *            3.2.3.2 无访问权限 next('/403')
 * ==================================================================================
 * 路由拦截逻辑 - 方式2 (采用方式2)
 * ==================================================================================
 * 1 未登录
 *   1.1 登录页                               next()
 *   1.2 这个路由可以匿名访问                   next()
 *   1.3 需登录才能访问 || 需鉴别权限后才能访问   next('/login?redirect=${fromHash}')
 *   1.4 其他情况                               next('/403')
 * 2 已经登录
 *   2.1 登录页                               next('/')
 *   2.2 这个路由可以匿名访问                   next()
 *   2.3 需登录才能访问 || 需鉴别权限后才能访问
 *       2.3.1 未拉取用户信息
 *            2.3.1.1 拉取信息失败   next('/500')，在request中处理错误提示
 *            2.3.1.2 拉取信息成功   更新本地信息，走分支2.3.2
 *       2.3.2 已拉取用户信息
 *             2.3.2.1 登录可访问 || 有访问权限  next()
 *             2.3.2.2 无访问权限               next('/403')
 *   2.4 其他情况                               next('/403')
 * ==================================================================================
 */
import { ElMessageBox } from "element-plus";
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
        // 2.3.1 未拉取用户信息
        if (!$store.state.VafAuth?.userinfo?.username) {
          const [err, data] = await $store.dispatch("VafAuth/getUserinfo");

          // 2.3.1.1 拉取信息失败
          if (err) {
            return next("/500");
          }
          // 2.3.1.2 拉取信息成功
          else {
            // 更新本地信息
            $store.commit("VafAuth/setUserinfo", {
              userinfo: data.userinfo,
              roles: data.roles,
            });
          }
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
