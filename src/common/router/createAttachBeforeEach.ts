import type { Router } from "vue-router";
import type { AuthLevel } from "@/common/helpers/getPermittedMenu";
import { LoadingStatus } from "@/common/stores/createUseSidebarStore";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import { getUseAuthStore, getUseSidebarStore } from "@/common/stores";

import hasIntersect from "@/common/helpers/hasIntersect";

declare module "vue-router" {
  interface RouteMeta {
    VafAuthLevel?: AuthLevel;
    VafAuthRoles?: any[];
  }
}

// NProgress Configuration
NProgress.configure({
  minimum: 0.5, // Changes the minimum percentage used upon starting. (default: 0.08).
  showSpinner: false, // Turn off loading spinner by setting it to false.
  trickleSpeed: 800, // how often to trickle, in ms.
});

const createAttachBeforeEach =
  (vafAppId: string) =>
  ($router: Router, enableLoginFilter = true, enableRoleFilter = true) => {
    $router.beforeEach(async (to, from, next) => {
      // start progress bar
      NProgress.start();

      const nextWithLoadMenu = createNextWithLoadSidebarMenu(
        next,
        to,
        vafAppId
      );

      // 1 关闭了登录过滤器, 角色过滤器也会失效, 可以直接进入任意路由.
      //   这是一个很危险的操作, 这将会关闭路由的登录验证和角色鉴权功能, 导致用户可以访问访问任意路由.
      //   除非你的应用是一个不需要登录验证和角色鉴权功能的应用, 你才可以关闭登录过滤器.
      if (!enableLoginFilter) return await nextWithLoadMenu();

      const $authStore = getUseAuthStore(vafAppId)();
      const token = $authStore.token;
      const routeRoles = to.meta?.VafAuthRoles || [];
      let VafAuthLevel = to.meta?.VafAuthLevel; // 0=>可匿名访问 | 1=>需登录(默认) | 2=>需鉴别角色
      if (![0, 1, 2].includes(VafAuthLevel)) {
        VafAuthLevel = 1; // 修正权限等级
      }

      // 2 未登录
      if (!token) {
        // 2.1 登录页
        if ("/login" === to.path) next();
        // 2.2 这个路由可以匿名访问
        else if (0 === VafAuthLevel) {
          // VafAuthLevel 中存在 `0 可匿名登录` 这个值的意义, 在于当token为空时，可以直接访问路由.
          await nextWithLoadMenu();
        }
        // 2.3 需登录才能访问 || 需鉴别权限后才能访问
        else if ([1, 2].includes(VafAuthLevel)) {
          // VafAuthLevel 中存在 `1 需登录` `2 需鉴别角色` 这2个值的意义, 在于当token为空时，需要去登录.
          const pathHash = encodeURIComponent(encodeURIComponent(to.fullPath));
          next(`/login?redirect=${pathHash}`);
        }
        // 2.4 其他情况
        else {
          next("/403");
        }
      }
      // 3 已经登录
      else {
        // 3.1 未拉取用户信息，则拉取用户信息
        //     在用户登录获取token后, 必须先拉取用户信息, 再去做后边的角色鉴权逻辑
        if (!$authStore.userinfo?.username) {
          const [err] = await $authStore.getUserinfo();

          // 3.1.1 拉取信息失败
          if (err) {
            return next("/500");
          }
          // 3.1.2 拉取信息成功
          //       更新本地信息(在action里做更新信息操作)，然后，走分支3.2
          // else { }
        }

        // 3.2 登录页
        if ("/login" === to.path) next("/");
        // 3.3 关闭了角色过滤器 || 这个路由可以匿名访问 || 需登录才能访问
        else if (!enableRoleFilter || [0, 1].includes(VafAuthLevel)) {
          // enableRoleFilter控制全局路由的角色鉴权, VafAuthLevel控制单个路由的角色鉴权.
          // enableRoleFilter优先级高于VafAuthLevel.
          await nextWithLoadMenu();
        }
        // 3.4 需鉴别角色权限后才能访问
        else if (2 === VafAuthLevel) {
          // 3.4.1 有访问权限
          if (
            hasIntersect(routeRoles, $authStore.roles) // 有访问权限，即路由配置角色与用户角色有交集
          ) {
            await nextWithLoadMenu();
          }
          // 3.4.2 无访问权限
          else next("/403");
        }
        // 3.5 其他情况
        else {
          next("/403");
        }
      }
    });
  };

// 定制next，加入了异步加载菜单的逻辑
function createNextWithLoadSidebarMenu(
  next: Function,
  to: any,
  vafAppId: string
) {
  return async function nextWithLoadMenu(path?: string | undefined) {
    // 如果是页面路由或者微路由, 同时还没有加载好侧边栏菜单, 加载menu
    if (to?.meta?.VafIsPageRoute || to?.meta?.VafIsMicroRoute) {
      const store = getUseSidebarStore(vafAppId)();
      if (store.loadingMenusStatus === LoadingStatus.Waiting) {
        // 关闭加载用户信息的loading框
        const authStore = getUseAuthStore(vafAppId)();
        if (authStore.isLoadingUserinfo) {
          authStore.isLoadingUserinfo = false;
        }

        // 加载menu
        await store.loadMenus();
      }
    }
    path ? next(path) : next();
  };
}

export default createAttachBeforeEach;
