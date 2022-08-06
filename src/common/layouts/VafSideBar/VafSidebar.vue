<template>
  <div class="vaf-sidebar">
    <div class="vaf-sidebar__left">
      <VafLogo />
      <VafMainmenu />
    </div>
    <div class="vaf-sidebar__right">
      <VafSubMenuTree />
    </div>
  </div>
</template>

<script>
import VafLogo from "./VafLogo.vue";
import VafMainmenu from "./VafMainmenu.vue";
import VafSubMenuTree from "./VafSubMenuTree.vue";

import { getUseLeftMenuStore } from "@/common/stores";

export default {
  name: "VafSideBar",
  components: { VafLogo, VafMainmenu, VafSubMenuTree },
  watch: {
    "$route.matched": {
      immediate: true,
      handler(matched) {
        if (!matched.length) return;

        // 孙子路由的meta里的VafLeftmenuId,
        // 即选中的子菜单的id
        const selectedSubmenuId =
          matched[matched.length - 1].meta?.VafLeftmenuId;

        const vafAppId = this.$vafAppId;
        const $leftmenuStore = getUseLeftMenuStore(vafAppId)();

        // 从leftmenu中回溯出出所有的父级菜单
        const mathedNodes = resolveMatchedNodes(
          selectedSubmenuId,
          $leftmenuStore.menus
        );

        if (!mathedNodes.length) return;

        $leftmenuStore.$patch({
          selectedMainmenuId: mathedNodes[0].id, // 选中的主菜单的id
          selectedSubmenuId, // 选中的子菜单的id
        });
      },
    },
  },
};

// 从数组中查找出元素的所有父节点
function resolveMatchedNodes(id, nodes) {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      const { children, ...self } = node;
      result.push({ ...self });
    } else if (node.children) {
      const matched = resolveMatchedNodes(id, node.children);
      if (matched.length) {
        const { children, ...self } = node;
        result.push({ ...self });
        result.push(...matched);
      }
    }
  }
  return result;
}
</script>

<style lang="scss">
@include b(sidebar) {
  z-index: $sidebarZIndex;
  height: 100%;
  background-color: white;

  @include e(left) {
    width: $mainMenuWidth;
    height: 100%;
    background-color: $mainMenuBgColor;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;
  }

  @include e(right) {
    width: $subMenuWidth;
    height: 100%;
    background-color: $subMenuBgColor;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;

    .submenu-tree-wrapper--hover {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $subMenuBgColor;
      display: inherit;
    }
  }
}
</style>
