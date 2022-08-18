import { defineStore } from "pinia";
import { getUseAuthStore } from "./createUseAuthStore";
import hasIntersect from "@/common/helpers/hasIntersect";

const useStores = {};

export const createUseLeftMenuStore = (
  vafAppId: string,
  leftmenuConfig: any = {}
) => {
  const menus: Menu[] | MenusFunc = leftmenuConfig?.menus || []; // 左侧菜单数据
  const isArr = Array.isArray(menus);

  const useLeftmenuStore = defineStore(`VafLeftMenuStore--${vafAppId}`, {
    state(): State {
      return {
        shouldLoadMenus: !isArr,
        loadingMenus: false,
        menus: isArr ? menus : [],
        selectedMainmenuId: "", // 选中的主菜单的id
        selectedSubmenuId: "", // 选中的子菜单的id
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
        }
        return [err, data];
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
function getPermittedSubmenu(
  tree: Menu[],
  adminUsername: string,
  adminRoles: string[]
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
