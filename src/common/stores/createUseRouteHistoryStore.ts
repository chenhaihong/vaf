import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

import { getRouter } from "@/common/router";

const useStores = {};

export const createUsePageHistoryStore = (vafAppId: string) => {
  const useRouteHistoryStore = defineStore(`VafPageHistoryStore--${vafAppId}`, {
    state(): State {
      return {
        list: [],
        currentFullPath: "",
      };
    },
    actions: {
      removeRouteHistory(index: number) {
        // 1. 如果关闭了选中的选项, 选中其他路由
        const closedFullPath = this.list[index].fullPath;
        if (closedFullPath === this.currentFullPath) {
          const L = this.list.length;
          const $router = getRouter(vafAppId);
          // 1.1 当前只有一个记录, 跳往首页
          if (L === 1) {
            $router.push("/");
          }
          // 1.2 当前有多个记录
          else {
            let nextRoute: RouteLocationNormalized;
            // 1.2.1 关闭尾部，选中前一个
            if (index === L - 1) {
              nextRoute = this.list[index - 1];
            }
            // 1.2.2 关闭中间，选中后一个
            // 1.2.3 关闭头部，选中后一个
            else {
              nextRoute = this.list[index + 1];
            }

            $router.push({
              name: nextRoute.name,
              path: nextRoute.path,
              query: nextRoute.query,
              params: nextRoute.params,
              hash: nextRoute.hash,
            });
          }
        }

        // 2. 删除记录
        this.list.splice(index, 1);
      },
    },
  });

  useStores[vafAppId] = useRouteHistoryStore;
};

export const getUsePageHistoryStore = (vafAppId: string) => {
  return useStores[vafAppId];
};

interface State {
  list: RouteLocationNormalized[]; // 路由历史列表
  currentFullPath: string; // 当前路由的完整路径
}
