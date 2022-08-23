<template>
  <el-scrollbar class="el-scrollbar--vaf-mainmenu" wrap-class="el-scrollbar__wrap--vaf-mainmenu">
    <div v-if="loadingMenus" class="vaf-mainmenu--loading">
      <span>加载中...</span>
    </div>
    <div v-else-if="shouldLoadMenus" class="vaf-mainmenu--load">
      <el-button type="primary" size="small" plain @click="loadMenus">
        {{ hideSubmenu ? '加载' : '加载菜单' }}
      </el-button>
    </div>
    <ul v-else class="vaf-mainmenu">
      <template v-for="item in mainmenu" :key="item.path">
        <a class="vaf-mainmenu__link" :title="item.title" :href="resolveMenuHref(item)" @click.prevent
          @mouseenter.self="enterMenu(item, $event)" @mouseleave.self="$emit('leave', item)">
          <li class="vaf-mainmenu__item" :class="{ 'is-active': selectedMainmenuId === item.id }"
            @click="handleClick(item)">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span v-show="!hideSubmenu" class="vaf-mainmenu__item__title">{{ item.title }}</span>
          </li>
        </a>
      </template>
    </ul>
  </el-scrollbar>
</template>

<script>
import { getUseLeftMenuStore } from "@/common/stores";
import confirmLink from "@/common/helpers/confirmLink.vue";

export default {
  name: "VafMainmenu",
  emits: ["enter", "leave"],
  computed: {
    hideSubmenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.hideSubmenu;
    },
    loadingMenus() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.loadingMenus;
    },
    shouldLoadMenus() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.shouldLoadMenus;
    },
    mainmenu() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.mainmenu;
    },
    selectedMainmenuId() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      return store.selectedMainmenuId;
    },
  },
  created() {
    this.loadMenus();
  },
  methods: {
    loadMenus() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      if (store.shouldLoadMenus) {
        store.loadMenus();
      }
    },
    resolveMenuHref(menu) {
      if (menu.type === 'http-link') {
        return menu.path;
      }
      return this.$router.resolve(menu.path)?.href || menu.path;
    },
    enterMenu(item, event) {
      this.$emit('enter', item, event.target.offsetTop);
    },
    handleClick(item) {
      switch (item.type) {
        case "router-link": // (1) 如果是Router Link，进入下个路由
          this.$router.push(item.path);
          break;
        case "http-link": // (2) 如果是http地址，提示打开新页面
          confirmLink(item.path);
          break;
        default:
          // (3) 提示不存在的类型
          this.$message.info(`${item.type} 不是有效的菜单类型`);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.el-scrollbar--vaf-mainmenu {
  height: calc(100% - $navbarHeight) !important;
  border-top: 1px solid $borderColor;
  box-sizing: border-box;

  .el-scrollbar__wrap--vaf-mainmenu {
    overflow-x: hidden !important;
  }

  .vaf-mainmenu {
    margin: 0;
    padding: 8px 0;
  }
}

@include b(mainmenu) {
  @include m(loading) {
    @include flex(row, nowrap, center, center);
    padding-top: 12px;
    color: var(--el-text-color-secondary);
    font-size: var(--el-font-size-base);
  }

  @include m(load) {
    @include flex(row, nowrap, center, center);
    padding-top: 12px;
  }

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
      font-weight: 700;
      color: $mainMenuTextColor;

      .el-icon {
        margin-right: $mainMenuTextMarginLeft;
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

// .hideSidebar {
//   .vaf-mainmenu__item {
//     padding: 0;
//     justify-content: center;

//     .vaf-mainmenu__item__title {
//       display: none;
//     }
//   }
// }
</style>
