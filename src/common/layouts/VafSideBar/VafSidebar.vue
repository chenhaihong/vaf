<template>
  <div class="vaf-sidebar">
    <div class="vaf-sidebar__left" :class="{ 'is-hide-submenu': hideSubmenu }">
      <VafLogo ref="logo" />
      <VafMainmenu @enter="enterMainmenu" @leave="delayhidingHoverSubmenu" />
      <transition v-if="!hideFloatingSubmenu" name="vaf-slide">
        <VafSubMenuTree class="vaf-submenu-tree-wrap--hover" :style="{ left: hoverSubmenuLeft, top: hoverSubmenuTop }"
          v-show="showHoverSubmenu" :submenu="hoverSubmenu" :selectedMainmenu="hoverMainmenu"
          :selectedSubmenuId="selectedSubmenuId" @mouseenter="enterHoverSubmenu"
          @mouseleave="delayhidingHoverSubmenu" />
      </transition>
    </div>
    <transition>
      <div class="vaf-sidebar__right" v-show="!hideSubmenu">
        <VafSubMenuTree :submenu="submenu" :selectedMainmenu="selectedMainmenu"
          :selectedSubmenuId="selectedSubmenuId" />
      </div>
    </transition>
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
      showHoverSubmenu: false,
      hoverMainmenu: null,
      hoverSubmenu: [],
      hoverSubmenuTop: '0px',
      hoverSubmenuLeft: '0px',
    };
  },
  computed: {
    hideSubmenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.hideSubmenu;
    },
    hideFloatingSubmenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.hideFloatingSubmenu;
    },
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
    enterMainmenu(item, mainmenuItemTop) {
      if (this.hideFloatingSubmenu) return;
      if (this.outId) {
        clearTimeout(this.outId);
      }

      this.showHoverSubmenu = true;
      this.hoverMainmenu = item;
      const logoHeight = this.$refs.logo?.$el.offsetHeight || 0;
      const logoWidth = this.$refs.logo?.$el.offsetWidth || 0;
      this.hoverSubmenuTop = (logoHeight + mainmenuItemTop - 6) + 'px'; // 减掉6像素
      this.hoverSubmenuLeft = (logoWidth - 1) + 'px'; // 减掉1个像素，便于移入浮动子菜单

      if (item?.type === 'router-link') {
        this.hoverSubmenu = this.getHoverSubmenu(item);
      } else {
        this.hoverSubmenu = [];
      }
    },
    enterHoverSubmenu() {
      if (this.hideFloatingSubmenu) return;
      if (this.outId) {
        clearTimeout(this.outId);
      }
    },
    delayhidingHoverSubmenu() {
      if (this.hideFloatingSubmenu) return;
      if (this.outId) {
        clearTimeout(this.outId);
      }
      this.outId = setTimeout(() => {
        this.showHoverSubmenu = false;
      }, 200);
    },
    getHoverSubmenu(mainmenu) {
      if (mainmenu) {
        const authStore = getUseAuthStore(this.$vafAppId)();
        const leftmenuStore = getUseLeftMenuStore(this.$vafAppId)();

        const username = authStore.userinfo?.username;
        const roles = authStore.roles;
        const hit = leftmenuStore.menus.find(
          (item) => item.id === mainmenu.id
        );
        const tree = hit ? hit.children : [];
        return getPermittedSubmenu(tree, username, roles);
      }
      return [];
    },
  },
};
</script>

<style lang="scss">
@include b(sidebar) {
  height: 100%;
  background-color: white;

  @include e(left) {
    z-index: 2;
    width: $mainMenuWidth;
    height: 100%;
    background-color: $mainMenuBgColor;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;

    @include when(hide-submenu) {
      width: 60px;

      .vaf-mainmenu__item {
        justify-content: center;

        .el-icon {
          margin-right: 0;
          font-size: 16px;
        }
      }
    }

    .vaf-submenu-tree-wrap--hover {
      position: absolute;
      top: $navbarHeight;
      left: $mainMenuWidth - 1;
      width: $subMenuWidth;
      height: auto;
      // max-height: calc(100% - $navbarHeight - 10px);
      background: $subMenuBgColor;
      box-shadow: 0px 0px 12px rgba(200, 200, 200, 0.6);
      border-radius: 8px;
      overflow: visible;

      .vaf-submenu-tree {
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: calc($navbarHeight / 2);
        left: 0;
        display: block;
        width: 20px;
        height: 20px;
        border: 10px solid transparent;
        border-right: 10px solid white;
        box-sizing: border-box;
        transform: translateX(-100%) translateY(-50%);
      }

      &::before {
        z-index: -1;
        border-right: 11px solid rgba(200, 200, 200, 0.6);
        transform: translateX(-100%) translateY(-50%) scale(1.1);
      }
    }
  }

  @include e(right) {
    z-index: 1;
    position: relative;
    width: $subMenuWidth;
    height: 100%;
    background-color: $subMenuBgColor;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;
  }
}
</style>
