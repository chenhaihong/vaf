import type { Menu } from "@/common/helpers/getPermittedMenu";

import { unref } from "vue";
import { defineStore } from "pinia";

import { getRouter } from "@/common/router";
import {
  getPermittedMainmenu,
  getPermittedSubmenu,
} from "@/common/helpers/getPermittedMenu";
import resolveMatchedParentNodes from "@/common/helpers/resolveMatchedParentNodes";

const useStores = {};

export const createUseSidebarStore = (
  vafAppId: string,
  sidebarConfig: any = {}
) => {
  const menus: Menu[] | MenusFunc = sidebarConfig?.menus || []; // 左侧菜单数据
  const isArr = Array.isArray(menus);

  const useSidebarStore = defineStore(`VafSidebarStore--${vafAppId}`, {
    state(): State {
      return {
        shouldLoadMenus: !isArr,
        loadingMenus: false,
        enableFilter: sidebarConfig.enableFilter || true, // 启用过滤器，启用时才根据内置规则进行过滤
        menus: isArr ? menus : [],
        selectedMainmenuId: "", // 选中的主菜单的id
        selectedSubmenuId: "", // 选中的子菜单的id
        hideSubmenu: false, // 是否隐藏子菜单
        hideFloatingSubmenu: !!sidebarConfig.hideFloatingSubmenu, // 是否隐藏浮动子菜单
      };
    },
    getters: {
      mainmenu(state): Menu[] {
        return getPermittedMainmenu(state.menus, vafAppId, this.enableFilter);
      },
      submenu(state): Menu[] {
        return getPermittedSubmenu(
          state.menus,
          this.selectedMainmenu,
          vafAppId,
          this.enableFilter
        );
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

        // 孙子路由的meta里的VafId,
        // 即选中的子菜单的id
        const selectedSubmenuId = matched[matched.length - 1].meta?.VafId;

        // 从sidebar.menus中回溯出所有的父级菜单
        const mathedNodes = resolveMatchedParentNodes(
          selectedSubmenuId,
          this.menus
        );

        if (mathedNodes.length) {
          this.selectedMainmenuId = mathedNodes[0].id; // 选中的主菜单的id
          this.selectedSubmenuId = selectedSubmenuId; // 选中的子菜单的id
        } else {
          this.selectedMainmenuId = null;
          this.selectedMainmenuId = null;
        }
      },
    },
  });

  useStores[vafAppId] = useSidebarStore;
  return useSidebarStore;
};

export const getUseSidebarStore = (vafAppId: string) => {
  return useStores[vafAppId];
};

interface State {
  shouldLoadMenus: boolean;
  loadingMenus: boolean;
  enableFilter: boolean;
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
