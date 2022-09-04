import type { Menu } from "@/common/helpers/getPermittedMenu";

import { defineStore } from "pinia";
import {
  getPermittedMainmenu,
  getPermittedSubmenu,
} from "@/common/helpers/getPermittedMenu";

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
    getters: {
      mainnav() {
        const list = getPermittedMainmenu(this.menus, vafAppId);
        list.forEach((item) => {
          const submenu = getPermittedSubmenu(this.menus, item, vafAppId);
          item.hasChildren = submenu.length > 0;
        });
        return list;
      },
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
