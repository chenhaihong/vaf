/**
 * 构建左侧菜单的store模块
 */
export default function makeLeftmenModule({
  menus = [], // 左侧菜单数据
} = {}) {
  return {
    namespaced: true,
    state: {
      menus,
      selectedMainmenuId: "", // 选中的主菜单的id
      selectedSubmenuId: "", // 选中的子菜单的id
    },
    getters: {
      mainmenu(state) {
        // 取菜单的第一层
        return state.menus.map((item) => {
          // TODO API的设计不合理，增加记忆难度，后续优化
          return {
            type: item.type,
            id: item.id,
            path: item.path,
            title: item.title,
          };
        });
      },
      submenu(state) {
        // TODO API的设计不合理，增加记忆难度，后续优化
        // console.log(state.selectedMainmenuId)
        const hit = state.menus.find(
          (item) => item.id === state.selectedMainmenuId
        );
        return hit ? hit.children : [];
      },
      selectedMainmenu(state, getters) {
        const selectedMainmenuId = state.selectedMainmenuId;
        const mainmenu = getters.mainmenu;
        // console.log(selectedMainmenuId, JSON.stringify(mainmenu, null, 2));

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
