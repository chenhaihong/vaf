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

        const vafAppId = this.$vafAppId;
        const $leftmenuStore = getUseLeftMenuStore(vafAppId)();
        $leftmenuStore.updateSelectedId();
      },
    },
  },
};
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
