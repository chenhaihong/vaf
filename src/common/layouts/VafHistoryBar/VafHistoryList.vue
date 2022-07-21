<template>
  <el-scrollbar always :native="false">
    <div class="vaf-history">
      <router-link
        v-for="(item, index) in list"
        class="vaf-history__item"
        :class="{ 'is-active': currentFullPath === item.fullPath }"
        :to="{
          name: item.name,
          path: item.path,
          query: item.query,
          params: item.params,
          hash: item.hash,
        }"
        :key="item.fullPath"
      >
        <el-tooltip
          :content="item.fullPath"
          placement="top-end"
          :hide-after="0"
        >
          <div class="vaf-history__item__trigger">
            <span class="vaf-history__item__text">{{ item.meta?.title }}</span>
            <span v-if="list.length > 1">
              <el-icon
                class="vaf-history__item__close"
                @click.prevent="close(index)"
              >
                <Close />
              </el-icon>
            </span>
          </div>
        </el-tooltip>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
</script>

<script>
export default {
  name: "VafHistoryList",
  computed: {
    list() {
      return this.$store.state.VafRouteHistory.list;
    },
    currentFullPath() {
      return this.$store.state.VafRouteHistory.currentFullPath;
    },
  },
  methods: {
    close(index) {
      this.$store.dispatch("VafRouteHistory/removeRouteHistory", index);
    },
  },
};
</script>

<style lang="scss">
@include b(history) {
  @include flex(row, nowrap, flex-start, center);
  padding: 0 10px;
  height: $historyBarHeight;
  box-sizing: border-box;

  @include e(item) {
    flex-shrink: 0;
    margin-right: 10px;
    padding: 0 10px;
    height: $historyBarContentHeight;
    line-height: $historyBarContentHeight;
    text-decoration: none;
    color: $historyBarContentColor;
    border-radius: 4px;
    background: $historyBarContentBgColor;

    &:hover {
      @include e(item__text) {
        color: $historyBarContentColorHover;
      }
    }

    @include when(active) {
      background: $historyBarContentBgColorActive;
    }

    @include e(item__close) {
      margin-left: 4px;
      vertical-align: middle;

      &:hover {
        color: red;
      }
    }
  }
}
</style>
