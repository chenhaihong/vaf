/**
 * 构建左侧菜单的store模块
 */

import { getStore } from "./";

import hasIntersect from "@/common/helpers/hasIntersect";

export default function makeLeftmenModule(vafAppId, leftmenuConfig = {}) {
  const {
    menus = [], // 左侧菜单数据
  } = leftmenuConfig;

  return {
    namespaced: true,
    state: {
      menus,
      selectedMainmenuId: "", // 选中的主菜单的id
      selectedSubmenuId: "", // 选中的子菜单的id
    },
    getters: {
      mainmenu(state) {
        const store = getStore(vafAppId);
        const username = store.state.VafAuth?.userinfo?.username;
        const roles = store.state.VafAuth.roles;

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
      submenu(state) {
        const store = getStore(vafAppId);
        const username = store.state.VafAuth?.userinfo?.username;
        const roles = store.state.VafAuth.roles;
        const hit = state.menus.find(
          (item) => item.id === state.selectedMainmenuId
        );
        const tree = hit ? hit.children : [];
        return getPermittedSubmenu(tree, username, roles);
      },
      selectedMainmenu(state, getters) {
        const selectedMainmenuId = state.selectedMainmenuId;
        const mainmenu = getters.mainmenu;

        return mainmenu.find((item) => item.id === selectedMainmenuId) || null;
      },
    },
    mutations: {
      setSelectedMainmenuId(state, id) {
        state.selectedMainmenuId = id;
      },
      setSelectedSubmenuId(state, id) {
        state.selectedSubmenuId = id;
      },
    },
  };
}

// 取得有权限的子菜单
function getPermittedSubmenu(tree, adminUsername, adminRoles) {
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
