<template>
  <ul ref="nav" class=" vaf-nav">
    <template v-for="item in menus" :key="item.path">
      <a class="vaf-nav__link" :title="item.title" :href="resolveMenuHref(item)" @click.prevent
        @mouseenter.self="enterMainnav(item, $event)" @mouseleave.self="delayHidingHoverSubnav">
        <li class="vaf-nav__item" @click="clickNav(item)">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span class="vaf-nav__item__title">{{ item.title }}</span>
        </li>
      </a>
    </template>
  </ul>
  <transition name="vaf-slide-vertical">
    <VafSubnavTree ref="subnav" class="vaf-subnav-tree-wrap--hover" v-show="showHoverSubnav" hideFirstNav hideToggle
      :submenu="hoverSubnav" :selectedMainmenu="hoverMainnav" @mouseenter="enterHoverSubnav"
      @mouseleave="delayHidingHoverSubnav" />
  </transition>
</template>

<script>
import { getPermittedSubmenu } from '@/common/helpers/getPermittedMenu';
import { getUseNavbarStore } from "@/common/stores";
import confirmLink from "@/common/helpers/confirmLink.vue";
import VafSubnavTree from '../VafSideBar/VafSubMenuTree.vue';

export default {
  name: 'VafNav',
  components: { VafSubnavTree },
  data() {
    return {
      showHoverSubnav: false,
      hoverMainnav: null,
      hoverSubnav: [],
      // hoverSubnavTop: '0px',
      // hoverSubnavLeft: '0px',
    };
  },
  computed: {
    menus() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.mainnav;
    },
  },
  methods: {
    resolveMenuHref(menu) {
      if (menu.type === 'http-link') {
        return menu.path;
      }
      return this.$router.resolve(menu.path)?.href || menu.path;
    },
    clickNav(item) {
      switch (item.type) {
        case "router-link": // (1) 如果是Router Link，进入下个路由
          this.$router.push(item.path);
          break;
        case "http-link": // (2) 如果是http地址，提示打开新页面
          confirmLink(item.path);
          break;
        default:
          // (3) 提示不存在的类型
          this.$message.info(`${item.type} 不是有效的导航菜单类型`);
          break;
      }
    },
    enterMainnav(item, event) {
      const subnav = this.getHoverSubnav(item);
      if (!subnav.length) {
        return;
      }
      this.outId && clearTimeout(this.outId);

      this.showHoverSubnav = true;
      this.hoverMainnav = item;
      this.hoverSubnav = subnav;

      const navTop = this.$refs.nav?.offsetTop || 0;
      const navHeight = this.$refs.nav?.offsetHeight || 0;
      const itemLeft = event.target?.offsetLeft || 0;
      const itemWidth = event.target?.offsetWidth || 0;

      const $el = this.$refs.subnav?.$el;
      if ($el) {
        $el.style.top = (navTop + navHeight + 10) + 'px'; // 加上10个像素，好看一点
        $el.style.left = (itemLeft + itemWidth / 2 - 64) + 'px';
      }
    },
    enterHoverSubnav() {
      this.outId && clearTimeout(this.outId);
    },
    delayHidingHoverSubnav() {
      this.outId && clearTimeout(this.outId);
      this.outId = setTimeout(() => {
        this.showHoverSubnav = false;
      }, 200);
    },
    getHoverSubnav(mainnav) {
      if (mainnav) {
        const store = getUseNavbarStore(this.$vafAppId)();
        return getPermittedSubmenu(store.menus, mainnav, this.$vafAppId);
      }
      return [];
    },
  },
  unmounted() {
    this.outId && clearTimeout(this.outId);
  },
}
</script>

<style lang="scss">
@include b(nav) {
  @include flex(row, nowrap, flex-end, center);
  flex: 1;

  @include e(link) {
    text-decoration: none;
    color: $mainMenuTextColor;
  }

  @include e(item) {
    & {
      cursor: pointer;
      @include flex(row, nowrap, flex-start, center);
      padding: 0 $mainMenuPadding;
      height: $mainMenuHeight;
      line-height: $mainMenuHeight;
      font-size: $mainMenuTextFontSize;
      color: $mainMenuTextColor;
      border-radius: 4px;

      .el-icon {
        margin-right: 4px;
      }
    }

    &:hover {
      background: $mainMenuTextColorHover;
    }

    @include when(active) {
      color: $mainMenuTextColorActive;
    }
  }

  @include e(item__title) {
    @include utils-ellipsis;
  }
}


@include b(subnav-tree-wrap) {
  @include m(hover) {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
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
      content: '';
      position: absolute;
      top: 1px;
      left: calc($subMenuWidth / 2);
      display: block;
      width: 20px;
      height: 20px;
      border: 10px solid transparent;
      border-bottom: 10px solid white;
      box-sizing: border-box;
      transform: translateX(-50%) translateY(-100%);
    }

    &::before {
      z-index: -1;
      border-bottom: 12px solid rgba(200, 200, 200, 0.6);
      transform: translateX(-50%) translateY(-100%) scale(1.1);
    }
  }
}

// transition name="vaf-slide-vertical"
.#{$namespace}-slide-vertical-enter-from,
.#{$namespace}-slide-vertical-leave-to {
  opacity: 0;
  transform: translate(0, -10px);
}

.#{$namespace}-slide-vertical-enter-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.#{$namespace}-slide-vertical-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.#{$namespace}-slide-vertical-enter-to,
.#{$namespace}-slide-vertical-leave-from {
  opacity: 1;
  transform: translate(0, 0);
}
</style>