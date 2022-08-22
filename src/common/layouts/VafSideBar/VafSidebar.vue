<template>
  <div class="vaf-sidebar">
    <div class="vaf-sidebar__left">
      <VafLogo />
      <VafMainmenu @enter="enterMainmenu" @leave="hideHoverSubmenu" />
    </div>
    <div class="vaf-sidebar__right">
      <VafSubMenuTree :submenu="submenu" :selectedMainmenu="selectedMainmenu" :selectedSubmenuId="selectedSubmenuId" />
      <transition name="vaf-slide">
        <VafSubMenuTree class="vaf-submenu-tree-wrap--hover" v-show="!!hoverMainmenu" :submenu="hoverSubmenu"
          :selectedMainmenu="hoverMainmenu" :selectedSubmenuId="selectedSubmenuId" @mouseenter="enterHoverSubmenu"
          @mouseleave="hideHoverSubmenu" />
      </transition>
    </div>
  </div>
</template>

<script>
import { getUseAuthStore, getUseLeftMenuStore } from "@/common/stores";
import { getPermittedSubmenu } from "@/common/stores/createUseLeftMenuStore";

import VafLogo from "./VafLogo.vue";
import VafMainmenu from "./VafMainmenu.vue";
import VafSubMenuTree from "./VafSubMenuTree.vue";

export default {
  name: "VafSideBar",
  components: { VafLogo, VafMainmenu, VafSubMenuTree },
  data() {
    return {
      hoverMainmenu: null,
    };
  },
  computed: {
    selectedMainmenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.selectedMainmenu;
    },
    selectedSubmenuId() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.selectedSubmenuId;
    },
    submenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.submenu;
    },
    hoverSubmenu() {
      const hoverMainmenu = this.hoverMainmenu;
      if (hoverMainmenu) {
        const authStore = getUseAuthStore(this.$vafAppId)();
        const leftmenuStore = getUseLeftMenuStore(this.$vafAppId)();

        const username = authStore.userinfo?.username;
        const roles = authStore.roles;
        const hit = leftmenuStore.menus.find(
          (item) => item.id === hoverMainmenu.id
        );
        const tree = hit ? hit.children : [];
        return getPermittedSubmenu(tree, username, roles);
      };
      return [];
    },
  },
  watch: {
    "$route.matched": {
      immediate: true,
      handler(matched) {
        if (!matched.length) return;

        const $leftmenuStore = getUseLeftMenuStore(this.$vafAppId)();
        $leftmenuStore.updateSelectedId();
      },
    },
  },
  methods: {
    enterMainmenu(item) {
      if (this.outId) {
        clearTimeout(this.outId);
      }
      if (item?.type === 'router-link') {
        this.hoverMainmenu = item;
      } else {
        this.hideHoverSubmenu();
      }
    },
    enterHoverSubmenu() {
      if (this.outId) {
        clearTimeout(this.outId);
      }
    },
    hideHoverSubmenu() {
      if (this.outId) {
        clearTimeout(this.outId);
      }
      this.outId = setTimeout(() => {
        this.hoverMainmenu = null;
      }, 300);
    },
  },
};
</script>

<style lang="scss">
@include b(sidebar) {
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
    z-index: 1;
    position: relative;
    width: $subMenuWidth;
    height: 100%;
    background-color: $subMenuBgColor;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;

    .vaf-submenu-tree-wrap--hover {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $subMenuBgColor;
      box-shadow: 0px 0px 12px rgba(200, 200, 200, 0.6);
    }
  }
}
</style>
