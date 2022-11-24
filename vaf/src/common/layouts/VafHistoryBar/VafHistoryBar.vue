<script>
import { getUseHistoryBarStore } from "@/common/stores";
import VafHistoryList from "./VafHistoryList.vue";

export default {
  name: "VafHistoryBar",
  components: { VafHistoryList },
  watch: {
    $route: {
      handler(next) {
        // 当下个路由是PageRoute时, 才会加入到tab路由历史中
        if (next.meta?.VafIsPageRoute || next.meta?.VafIsMicroRoute) {
          const store = getUseHistoryBarStore(this.$vafAppId)();

          // 1. 高亮选项卡
          store.$patch({ currentFullPath: next.fullPath });

          // 2. 如果没加入这个路由记录，则加入路由历史记录
          const index = store.list.findIndex(
            (item) => item.fullPath === next.fullPath
          );
          if (index === -1) {
            store.$patch((state) => {
              state.list.push(next);
            });
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <div class="vaf-history-bar">
    <VafHistoryList />
  </div>
</template>

<style lang="scss">
@include b(history-bar) {
  @include flex(row, nowrap, flex-start, stretch);
  z-index: $historyBarZIndex;
  height: $historyBarHeight;
  font-size: $historyBarTextFontSize;
  background-color: white;
  border-bottom: 1px solid $borderColor;
}
</style>
