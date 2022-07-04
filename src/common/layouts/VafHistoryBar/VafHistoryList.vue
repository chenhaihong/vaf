<template>
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
      <el-tooltip :content="item.fullPath" placement="top-end" :hide-after="0">
        <div>
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
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
</script>

<script>
export default {
  name: "VafHistoryList",
  props: {
    list: { type: Array, default: () => [] },
    currentFullPath: { type: String, default: "" },
  },
  methods: {
    close(index) {
      this.$emit("close", index);
    },
  },
};
</script>

<style lang="scss">
@include b(history) {
  @include flex(row, nowrap, flex-start, center);
  padding: 0 10px;
  height: $historyBarHeight;

  @include e(item) {
    padding: 0 10px;
    height: $historyBarContentHeight;
    line-height: $historyBarContentHeight;
    color: $historyBarContentColor;
    border-radius: 4px;
    text-decoration: none;
    background: $historyBarContentBgColor;

    &:hover {
      @include e(item__text) {
        color: $historyBarContentColorHover;
      }
      // @include e(item__close) {
      //   display: inline-flex !important;
      // }
    }

    @include when(active) {
      background: $historyBarContentBgColorActive;
    }

    @include e(item__close) {
      // display: none !important;
      margin-left: 4px;
      vertical-align: middle;

      &:hover {
        color: red;
      }
    }
  }
}

.vaf-history__item + .vaf-history__item {
  margin-left: 10px;
}
</style>
