<script>
import VafHistoryList from "./VafHistoryList.vue";

export default {
  name: "VafHistoryBar",
  components: { VafHistoryList },
  data() {
    return { list: [], currentFullPath: "" };
  },
  watch: {
    $route: {
      handler(next) {
        // 1. 高亮选项卡
        this.currentFullPath = next.fullPath;

        // 2. 如果没加入这个路由记录，则加入路由历史记录
        const index = this.list.findIndex(
          (item) => item.fullPath === next.fullPath
        );
        if (index === -1) {
          this.list.push(next);
        }
      },
      immediate: true,
    },
  },
  methods: {
    remove(index) {
      const L = this.list.length;

      // 0. 只有一个时，不准关闭
      if (L === 1) {
        return void 0;
      }

      const nextList = this.list.filter((_, i) => i !== index);

      // 1. 关闭了未选中的选项
      const closedFullPath = this.list[index].fullPath; // 这个也是keep-alive的缓存key
      if (closedFullPath !== this.currentFullPath) {
        this.list = nextList;
        // TODO 删除缓存
      }
      // 2. 关闭了选中的选项
      else {
        let nextRoute;

        // 2.1 关闭尾部，选中前一个
        if (index === L - 1) {
          nextRoute = this.list[index - 1];
        }
        // 2.2 关闭中间，选中后一个
        // 2.3 关闭头部，选中后一个
        else {
          nextRoute = this.list[index + 1];
        }

        this.$router.replace({
          name: nextRoute.name,
          path: nextRoute.path,
          query: nextRoute.query,
          params: nextRoute.params,
          hash: nextRoute.hash,
        });

        this.list = nextList;
        // TODO 删除缓存
      }
    },
  },
};
</script>

<template>
  <div class="vaf-history-bar">
    <VafHistoryList
      :list="this.list"
      :currentFullPath="currentFullPath"
      @close="remove"
    />
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
