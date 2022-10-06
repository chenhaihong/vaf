<template>
  <div class="vaf-navbar">
    <div class="vaf-submenu-toggle" @click="toggleSubmenu">
      <el-icon>
        <Expand v-if="hideSubmenu" />
        <Fold v-else />
      </el-icon>
    </div>
    <VafNav />
    <el-divider v-if="ifPrefixDivider" direction="vertical" />
    <VafUserinfo v-if="ifUserinfo" />
  </div>
</template>

<script>
import { Expand, Fold } from '@element-plus/icons-vue'

import { getUseNavbarStore, getUseSidebarStore } from "@/common/stores";

import VafNav from "./VafNav.vue";
import VafUserinfo from "./VafUserinfo.vue";

export default {
  name: "VafNavbar",
  components: {
    Expand, Fold, VafUserinfo, VafNav,
  },
  computed: {
    hideSubmenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.hideSubmenu;
    },
    ifPrefixDivider() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.menus.length && store.ifUserinfo;
    },
    ifUserinfo() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.ifUserinfo;
    },
  },
  methods: {
    toggleSubmenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      store.hideSubmenu = !store.hideSubmenu;
    },
  },
};
</script>

<style lang="scss">
@include b(navbar) {
  z-index: $navbarZIndex;

  @include flex(row, nowrap, flex-start, center);
  position: relative;
  padding: 0 10px;
  height: $navbarHeight;
  background-color: white;
  border-bottom: 1px solid $borderColor;
}

@include b(submenu-toggle) {
  cursor: pointer;
  padding: 6px 8px;
  background: lighten($color: $mainMenuTextColorHover, $amount: 2.5);
  border-radius: 4px;
  user-select: none;

  &:hover {
    background: $mainMenuTextColorHover;
  }
}
</style>
