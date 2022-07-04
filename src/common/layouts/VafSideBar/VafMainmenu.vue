<template>
  <el-scrollbar
    class="el-scrollbar--vaf-mainmenu"
    wrap-class="el-scrollbar__wrap--vaf-mainmenu"
  >
    <ul class="vaf-mainmenu">
      <li
        class="vaf-mainmenu__item"
        :class="{ 'is-active': selectedMainmenuId === item.id }"
        v-for="item in mainmenu"
        :key="item.path"
        :title="item.label"
        @click.stop="handleClick(item)"
      >
        <span class="vaf-mainmenu__item__title">{{ item.title }}</span>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import confirmLink from "@/common/helpers/confirmLink";

export default {
  name: "VafMainmenu",
  computed: {
    mainmenu() {
      return this.$store.getters["VafLeftmenu/mainmenu"];
    },
    selectedMainmenuId() {
      return this.$store.state.VafLeftmenu.selectedMainmenuId;
    },
  },
  methods: {
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
      .main-menu-icon {
        color: $mainMenuIconColorHover;
      }
    }

    @include when(active) {
      color: $mainMenuTextColorActive;
      .main-menu-icon {
        color: $mainMenuIconColorActive;
      }
    }
  }

  @include e(item__title) {
    // margin-left: $mainMenuTextMarginLeft;
    font-size: $mainMenuTextFontSize;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
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
