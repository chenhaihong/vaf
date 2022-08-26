import { unref } from "vue";
import { defineStore } from "pinia";

import { getRouter } from "@/common/router";
import hasIntersect from "@/common/helpers/hasIntersect";
import resolveMatchedParentNodes from "@/common/helpers/resolveMatchedParentNodes";

import { getUseAuthStore } from "./createUseAuthStore";

const useStores = {};

export const createUseLeftMenuStore = (
  vafAppId: string,
  sidebarConfig: any = {}
) => {
  const menus: Menu[] | MenusFunc = sidebarConfig?.menus || []; // 左侧菜单数据
  const isArr = Array.isArray(menus);

  const useLeftmenuStore = defineStore(`VafLeftMenuStore--${vafAppId}`, {
    state(): State {
      return {
        shouldLoadMenus: !isArr,
        loadingMenus: false,
        menus: isArr ? menus : [],
        selectedMainmenuId: "", // 选中的主菜单的id
        selectedSubmenuId: "", // 选中的子菜单的id
        hideSubmenu: false, // 是否隐藏子菜单
        hideFloatingSubmenu: !!sidebarConfig.hideFloatingSubmenu, // 是否隐藏浮动子菜单
      };
    },
    getters: {
      mainmenu(state): Menu[] {
        const authStore = getUseAuthStore(vafAppId)();
        const username = authStore.userinfo?.username;
        const roles = authStore.roles;
        return state.menus
          .map((item) => {
            // 取菜单的第一层
            return {
              type: item.type,
              id: item.id,
              path: item.path,
              title: item.title,
              icon: item.icon,
              authLevel: item.authLevel,
              authRoles: item.authRoles,
            };
          })
          .filter((item) => {
            // 只返回有权限的菜单
            let { authLevel = 1, authRoles = [] } = item;
            if (![0, 1, 2].includes(authLevel)) {
              // 修正 authLevel 的值
              authLevel = 1;
            }
            return (
              authLevel === 0 || // 可匿名访问
              (authLevel === 1 && username) || // 登录即可访问
              hasIntersect(authRoles, roles) // 有访问权限
            );
          });
      },
      submenu(state): Menu[] {
        const authStore = getUseAuthStore(vafAppId)();
        const username = authStore.userinfo?.username;
        const roles = authStore.roles;
        const hit = state.menus.find(
          (item) => item.id === state.selectedMainmenuId
        );
        const tree = hit ? hit.children : [];
        return getPermittedSubmenu(tree, username, roles);
      },
      selectedMainmenu(state): Menu | undefined {
        const selectedMainmenuId = state.selectedMainmenuId;
        const mainmenu = this.mainmenu;

        return mainmenu.find((item: Menu) => item.id === selectedMainmenuId);
      },
    },
    actions: {
      async loadMenus() {
        if (this.loadingMenus) return [null, null];
        this.loadingMenus = true;
        const [err, data] = await (menus as MenusFunc)();
        this.loadingMenus = false;
        if (!err) {
          this.shouldLoadMenus = false;
          this.menus = data;
          this.updateSelectedId();
        }
        return [err, data];
      },
      updateSelectedId() {
        const router = getRouter(vafAppId);
        const matched = unref(router.currentRoute).matched;

        // 孙子路由的meta里的VafLeftmenuId,
        // 即选中的子菜单的id
        const selectedSubmenuId =
          matched[matched.length - 1].meta?.VafLeftmenuId;

        // 从leftmenu中回溯出所有的父级菜单
        const mathedNodes = resolveMatchedParentNodes(
          selectedSubmenuId,
          this.menus
        );

        if (!mathedNodes.length) return;

        this.selectedMainmenuId = mathedNodes[0].id; // 选中的主菜单的id
        this.selectedSubmenuId = selectedSubmenuId; // 选中的子菜单的id
      },
    },
  });

  useStores[vafAppId] = useLeftmenuStore;
  return useLeftmenuStore;
};

export const getUseLeftMenuStore = (vafAppId: string) => {
  return useStores[vafAppId];
};

// 取得有权限的子菜单
export function getPermittedSubmenu(
  tree: Menu[] = [],
  adminUsername: string,
  adminRoles: string[] = []
) {
  return tree.filter((item) => {
    const { authLevel = 1, authRoles = [], children = [] } = item;
    if (children.length > 0) {
      item.children = getPermittedSubmenu(children, adminUsername, adminRoles);
    }
    return (
      authLevel === 0 || // 可匿名访问
      (authLevel === 1 && adminUsername) || // 登录即可访问
      hasIntersect(authRoles, adminRoles) // 有访问权限
    );
  });
}

interface State {
  shouldLoadMenus: boolean;
  loadingMenus: boolean;
  menus: Menu[];
  selectedMainmenuId: string;
  selectedSubmenuId: string;
  hideSubmenu: boolean;
  hideFloatingSubmenu: boolean;
}

interface MenusFunc {
  (): MenusFuncResult | Promise<MenusFuncResult>;
}

type MenusFuncResult = [null | undefined | Error, Menu[]];

interface Menu {
  type: MenuType;
  id: string;
  path: string;
  title: string;
  icon?: string;
  authLevel?: AuthLevel;
  authRoles?: string[];
  children?: undefined | null | Menu[];
}

enum MenuType {
  RouterLink = "router-link",
  HttpLink = "http-link",
}

enum AuthLevel {
  Anonymous = 0, // 无需登录
  LoggedIn = 1, // 已登录
  SpecifiedRoles = 2, // 已登录并且需要拥有指定角色
}
