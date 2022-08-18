<template>
  <el-scrollbar class="el-scrollbar--vaf-mainmenu" wrap-class="el-scrollbar__wrap--vaf-mainmenu">
    <div v-if="loadingMenus" class="vaf-mainmenu--loading">
      <span>加载中...</span>
    </div>
    <div v-else-if="shouldLoadMenus" class="vaf-mainmenu--load">
      <el-button type="primary" size="small" plain @click="loadMenus">加载菜单</el-button>
    </div>
    <ul v-else class="vaf-mainmenu">
      <li class="vaf-mainmenu__item" :class="{ 'is-active': selectedMainmenuId === item.id }" v-for="item in mainmenu"
        :key="item.path" @click="handleClick(item)">
        <a class="vaf-mainmenu__item__title" :title="item.title" :href="item.path" @click.prevent>
          {{ item.title }}
        </a>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import { getUseLeftMenuStore } from "@/common/stores";
import confirmLink from "@/common/helpers/confirmLink.vue";

export default {
  name: "VafMainmenu",
  computed: {
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
    this.loadMenus()
  },
  methods: {
    loadMenus() {
      const store = getUseLeftMenuStore(this.$vafAppId)();
      if (store.shouldLoadMenus) {
        store.loadMenus();
      }

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

  @include e(item) {
    & {
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 $mainMenuPadding;
      height: $mainMenuHeight;
      line-height: $mainMenuHeight;
      font-weight: 700;
      color: $mainMenuTextColor;
    }

    &:hover {
      background: $mainMenuTextColorHover;
      // .main-menu-icon {
      //   color: $mainMenuIconColorHover;
      // }
    }

    @include when(active) {
      color: $mainMenuTextColorActive;

      @include e(item__title) {
        color: $mainMenuTextColorActive;
      }

      // .main-menu-icon {
      //   color: $mainMenuIconColorActive;
      // }
    }
  }

  @include e(item__title) {
    // margin-left: $mainMenuTextMarginLeft;
    font-size: $mainMenuTextFontSize;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    color: $mainMenuTextColor;
  }
}

.hideSidebar {
  .vaf-mainmenu__item {
    padding: 0;
    justify-content: center;

    .vaf-mainmenu__item__title {
      display: none;
    }
  }
}
</style>
