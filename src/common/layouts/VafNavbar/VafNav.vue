<template>
  <ul class="vaf-nav">
    <template v-for="item in menus" :key="item.path">
      <a class="vaf-nav__link" :title="item.title" :href="resolveMenuHref(item)" @click.prevent
        @mouseenter.self="enterLink(item, $event)" @mouseleave.self="leaveLink">
        <li class="vaf-nav__item" @click="clickNav(item)">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span class="vaf-nav__item__title">{{ item.title }}</span>
        </li>
      </a>
    </template>
  </ul>
  <Subnav v-show="showSubnav" class="vaf-submenu-tree-wrap--subnav" />
</template>

<script>
import { getUseNavbarStore } from "@/common/stores";
import confirmLink from "@/common/helpers/confirmLink.vue";
import Subnav from '../VafSideBar/VafSubMenuTree.vue';

export default {
  name: 'VafNav',
  components: { Subnav },
  data() {
    return {
      showSubnav: false,
    };
  },
  computed: {
    menus() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.menus;
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
    enterLink(item, event) {
      if (this.outId) {
        clearTimeout(this.outId);
      }
    },
    leaveLink() {
      if (this.outId) {
        clearTimeout(this.outId);
      }
      this.outId = setTimeout(() => {
        this.showSubnav = false;
      }, 300);
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>