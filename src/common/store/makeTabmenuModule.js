/**
 * 构建tab菜单相关的store模块
 */

export default function makeTabModule() {
  return {
    namespaced: true,
    state: {
      menus: [],
      cachedViews: ["VafProFormDemo", "VafProTableDemo"],
    },
    getters: {},
    mutations: {
      add(state, to) {
        state.menus.push(to);
      },
      remove(state, index) {
        state.menus.splice(index, 1);
      },
      clear(state) {
        state.menus = [];
      },
    },
    actions: {},
  };
}
