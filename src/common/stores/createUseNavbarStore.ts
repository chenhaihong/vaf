import { defineStore } from "pinia";

const useStores = {};

export const createUseNavbarStore = (
  vafAppId: string,
  navbarConfig: any = {}
) => {
  const {
    hideUserinfo = false, // 是否隐藏用户信息
    menus = [], // 菜单配置
  } = navbarConfig;

  const useNavbarStore = defineStore(`VafNavbarStore--${vafAppId}`, {
    state(): State {
      return {
        ifUserinfo: !hideUserinfo,
        menus: Array.isArray(menus) ? menus : [],
      };
    },
    actions: {
      hideUserinfo() {
        this.ifUserinfo = false;
      },
      showUserinfo() {
        this.ifUserinfo = true;
      },
    },
  });

  useStores[vafAppId] = useNavbarStore;
  return useNavbarStore;
};

export const getUseNavbarStore = (vafAppId: string) => {
  return useStores[vafAppId];
};

interface State {
  ifUserinfo: boolean; // 是否展示用户信息
  menus: Menu[]; // 导航菜单列表
}

interface Menu {
  type: MenuType;
  path: string;
  title: string;
  icon?: string;
  authLevel?: AuthLevel;
  authRoles?: string[];
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
