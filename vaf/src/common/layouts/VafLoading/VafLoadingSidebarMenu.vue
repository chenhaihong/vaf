<template>
  <div class="vaf-loading-sidebar-menu-wrap">
    <div
      v-if="status === LoadingStatus.Loading"
      v-loading="true"
      element-loading-text="加载菜单"
      class="vaf-loading-sidebar-menu"
    />
    <el-result
      v-else-if="status === LoadingStatus.Error"
      class="vaf-loading-sidebar-menu"
      icon="error"
      title="加载菜单失败"
      sub-title="点击按钮重试"
    >
      <template #extra>
        <el-button type="primary" plain @click="loadMenus"> 重试 </el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoadingStatus } from "@/common/stores/createUseSidebarStore";
import { getUseSidebarStore } from "@/common/stores";

export default defineComponent({
  name: "VafLoadingSidebarMenu",
  data() {
    return { LoadingStatus };
  },
  computed: {
    status() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.loadingMenusStatus;
    },
  },
  methods: {
    loadMenus() {
      const store = getUseSidebarStore(this.$vafAppId)();
      store.loadMenus();
    },
  },
});
</script>

<style lang="scss">
@include b(loading-sidebar-menu-wrap) {
  position: absolute;
  width: 100%;
  height: 100%;
}

@include b(loading-sidebar-menu) {
  width: 100%;
  height: 100%;
}
</style>
