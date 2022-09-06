<template>
  <div ref="sidebar" class="vaf-sidebar">
    <div class="vaf-sidebar__left" :class="{ 'is-hide-submenu': hideSubmenu }">
      <VafLogo ref="logo" />
      <VafMainmenu @enter="enterMainmenu" @leave="delayhidingHoverSubmenu" />
      <transition v-if="!hideFloatingSubmenu" name="vaf-slide">
        <VafSubMenuTree ref="hoverSubmenu" class="vaf-submenu-tree-wrap--hover" v-show="showHoverSubmenu" hideFirstNav
          :submenu="hoverSubmenu" :selectedMainmenu="hoverMainmenu" :selectedSubmenuId="selectedSubmenuId"
          @mouseenter="enterHoverSubmenu" @mouseleave="delayhidingHoverSubmenu" />
      </transition>
    </div>
    <transition name="vaf-toggle-sidemenu">
      <div class="vaf-sidebar__right" v-show="!hideSubmenu">
        <VafSubMenuTree :submenu="submenu" :selectedMainmenu="selectedMainmenu"
          :selectedSubmenuId="selectedSubmenuId" />
      </div>
    </transition>
  </div>
</template>

<script>
import { getUseSidebarStore } from "@/common/stores";
import { getPermittedSubmenu } from "@/common/helpers/getPermittedMenu";

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
    };
  },
  computed: {
    hideSubmenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.hideSubmenu;
    },
    hideFloatingSubmenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.hideFloatingSubmenu;
    },
    selectedMainmenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.selectedMainmenu;
    },
    selectedSubmenuId() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.selectedSubmenuId;
    },
    submenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return store.submenu;
    },
  },
  watch: {
    "$route.matched": {
      immediate: true,
      handler(matched) {
        if (!matched.length) return;

        const $sidebarStore = getUseSidebarStore(this.$vafAppId)();
        $sidebarStore.updateSelectedId();
      },
    },
  },
  methods: {
    enterMainmenu(item, mainmenuItemOffsetTop) {
      if (this.hideFloatingSubmenu) return;
      const submenu = this.getHoverSubmenu(item);
      if (!submenu.length) {
        return;
      }
      this.outId && clearTimeout(this.outId);

      this.showHoverSubmenu = true;
      this.hoverMainmenu = item;
      this.hoverSubmenu = submenu;

      const logoWidth = this.$refs.logo?.$el.offsetWidth || 0;
      const logoHeight = this.$refs.logo?.$el.offsetHeight || 0;
      const hoverSubmenuTop = logoHeight + mainmenuItemOffsetTop - 6; // 减掉6像素
      const $el = this.$refs.hoverSubmenu?.$el;
      if ($el) {
        // 需要重置高度为auto值, 才能拿到浮动子菜单自动展开时的高度值.
        $el.style.height = "auto";
        // 设置悬浮子菜单的位置
        $el.style.top = hoverSubmenuTop + "px";
        $el.style.left = logoWidth + "px";
      }

      this.$nextTick(() => {
        // 限制悬浮子菜单的高度, 不让超出应用自身的区域.
        if ($el) {
          const sidebarHeight = this.$refs.sidebar?.offsetHeight || 0;
          const hoverSubmenuHeight = $el.offsetHeight || 0;
          if (hoverSubmenuTop + hoverSubmenuHeight > sidebarHeight - 10) {
            // 超出了应用自身的区域
            $el.style.height = sidebarHeight - hoverSubmenuTop - 10 + "px"; // 减少10px, 可完整显示阴影.
          }
        }
      });
    },
    enterHoverSubmenu() {
      if (this.hideFloatingSubmenu) return;
      this.outId && clearTimeout(this.outId);
    },
    delayhidingHoverSubmenu() {
      if (this.hideFloatingSubmenu) return;
      this.outId && clearTimeout(this.outId);
      this.outId = setTimeout(() => {
        this.showHoverSubmenu = false;
      }, 50);
    },
    getHoverSubmenu(mainmenu) {
      if (mainmenu) {
        const sidebarStore = getUseSidebarStore(this.$vafAppId)();
        return getPermittedSubmenu(
          sidebarStore.menus,
          mainmenu,
          this.$vafAppId,
          sidebarStore.enableFilter
        );
      }
      return [];
    },
  },
  unmounted() {
    this.outId && clearTimeout(this.outId);
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
    transition: width 0.3s ease-in-out;

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
      z-index: 1;
      position: absolute;
      top: $navbarHeight;
      left: $mainMenuWidth - 1;
      width: $subMenuWidth;
      height: auto;
      background: $subMenuBgColor;
      box-shadow: 0px 0px 12px rgba(200, 200, 200, 0.6);
      border-radius: 8px;
      overflow: visible;

      .vaf-submenu-tree {
        height: calc(100%);
        border-radius: 8px;
      }

      &::before,
      &::after {
        pointer-events: none; // 点击穿透
        content: "";
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
    box-sizing: content-box;
  }
}

// transition name="slide"
.#{$namespace}-slide-enter-from,
.#{$namespace}-slide-leave-to {
  opacity: 0;
  transform: translate(-10px, 0);
}

.#{$namespace}-slide-enter-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.#{$namespace}-slide-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.#{$namespace}-slide-enter-to,
.#{$namespace}-slide-leave-from {
  opacity: 1;
  transform: translate(0, 0);
}

// transition name="vaf-toggle-sidemenu"
.#{$namespace}-toggle-sidemenu-enter-from,
.#{$namespace}-toggle-sidemenu-leave-to {
  width: 0px;
}

.#{$namespace}-toggle-sidemenu-enter-active,
.#{$namespace}-toggle-sidemenu-leave-active {
  transition: width 0.3s ease-in-out;
}
</style>
