/**
 * 路由历史的模块
 */

import { getRouter } from "@/common/router";

export default function makeRouteHistoryModule(vafAppId) {
  return {
    namespaced: true,
    state: {
      list: [], // 路由历史列表
      currentFullPath: "", // 当前路由的完整路径
    },
    getters: {
      // fullPath列表, 用于keep-alive组件, 作为keep-alive的inlcude属性.
      //   因为包壳组件使用fullPath来当做name,
      //   所以keep-alive依靠这个值来确定哪些包壳组件需要被缓存.
      // fullPathList 更新后, keep-alive会自动删除缓存的包壳组件
      fullPathList(state) {
        return state.list.map((item) => item.fullPath);
      },
    },
    mutations: {
      setCurrentFullPath(state, fullPath) {
        state.currentFullPath = fullPath;
      },
      // 添加路由历史记录
      add(state, route) {
        const index = state.list.findIndex(
          (item) => item.fullPath === route.fullPath
        );

        // 如果没加入这个路由记录，才加入路由历史记录
        if (index === -1) {
          state.list.push(route);
        }
      },
      // 删除路由历史记录
      remove(state, index) {
        const L = state.list.length;

        // 只有一个时，不准关闭
        if (L > 1) {
          const nextList = state.list.filter((_, i) => i !== index);
          state.list = nextList;
        }
      },
    },
    actions: {
      removeRouteHistory({ commit, state }, index) {
        // 1. 如果关闭了选中的选项, 选中其他路由
        const closedFullPath = state.list[index].fullPath;
        if (closedFullPath === state.currentFullPath) {
          let nextRoute;

          // 2.1 关闭尾部，选中前一个
          const L = state.list.length;
          if (index === L - 1) {
            nextRoute = state.list[index - 1];
          }
          // 2.2 关闭中间，选中后一个
          // 2.3 关闭头部，选中后一个
          else {
            nextRoute = state.list[index + 1];
          }

          const $router = getRouter(vafAppId);
          $router.push({
            name: nextRoute.name,
            path: nextRoute.path,
            query: nextRoute.query,
            params: nextRoute.params,
            hash: nextRoute.hash,
          });
        }

        // 2. 删除记录
        commit("remove", index);
      },
    },
  };
}
