<template>
  <div class="vaf-submenu-tree-wrap">
    <div class="vaf-first-nav">
      <a v-if="selectedMainmenu" class="vaf-first-nav__name" @click.prevent="clickSelectedMainmenu(selectedMainmenu)"
        :href="resolveMenuHref(selectedMainmenu)">
        {{ selectedMainmenu ? selectedMainmenu.title : "" }}
      </a>
    </div>
    <div class="vaf-submenu-tree">
      <el-scrollbar always>
        <el-tree ref="subMenuTree" :data="submenu" empty-text="无菜单" node-key="id"
          :props="{ children: 'children', label: 'title' }" default-expand-all highlight-current :indent="8"
          :current-node-key="selectedSubmenuId" @node-click="clickTreeNode">
          <template #default="scope">
            <a class="custom-label" :href="resolveMenuHref(scope.data)" @click.prevent>
              <span class="custom-label__text">
                {{ scope.data?.title }}
              </span>
            </a>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import confirmLink from "@/common/helpers/confirmLink.vue";

export default {
  name: "VafSubMenuTree",
  props: {
    selectedMainmenu: { type: Object },
    selectedSubmenuId: { type: String, default: '' },
    submenu: { type: Array, default: () => [] },
  },
  watch: {
    selectedSubmenuId(next) {
      // 非点击submenu的tree-node方式切换路由时,
      // submenu的无法自动正常高亮目标tree-node,
      // 需要手动调api来高亮目标tree-node.
      this.$nextTick(() => {
        this.$refs["subMenuTree"]?.setCurrentKey(next);
      });
    },
    submenu() {
      // 帮助hover出来的子菜单高亮目标tree-node.
      this.$nextTick(() => {
        this.$refs["subMenuTree"]?.setCurrentKey(this.selectedSubmenuId);
      });
    },
  },
  methods: {
    clickSelectedMainmenu(menu) {
      this.$router.push(menu.path);
    },
    resolveMenuHref(menu = {}) {
      if (menu.type === 'http-link') {
        return menu.path;
      }
      return this.$router.resolve(menu.path)?.href || menu.path;
    },
    async clickTreeNode(item) {
      // (1) 如果item包含children，则直接展开
      if (item.children) return;

      // (2) 如果item不包含children
      switch (item.type) {
        // (2.1) 如果是Router Link，进入下个路由
        case "router-link":
          this.$router.push(item.path);
          break;
        // (2.2) 如果是http地址，提示打开新页面
        case "http-link":
          // 提示在新窗口打开网页
          await confirmLink(item.path);
          // 此时, submenu高亮了点中的tree-node,
          // 需要手动调api来高亮之前选中的tree-node.
          this.$refs["subMenuTree"]?.setCurrentKey(this.selectedSubmenuId);
          break;
        // (2.3) 提示不存在的类型
        default:
          this.$message.info(`${item.type} 不是有效的菜单类型`);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@include b(submenu-tree-wrap) {
  // width: $subMenuWidth;
  height: 100%;
  overflow: hidden;

  // border-right: 1px solid $borderColor;
  box-sizing: border-box;
}

@include b(submenu-tree) {
  // width: $subMenuWidth;
  height: calc(100% - $navbarHeight);
  border-top: 1px solid $borderColor;
  box-sizing: border-box;
  overflow: hidden;
}

@include b(first-nav) {
  z-index: 1;
  position: relative;
  padding: 0 $firstNavPadding;
  height: $navbarHeight;
  line-height: $navbarHeight;
  overflow: hidden;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;

  @include e(name) {
    padding: 0 4px;
    font-size: $firstNavFontSize;
    font-weight: 400 !important;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    color: $subMenuContentColor;

    &:hover {
      cursor: pointer;
      color: $firstNavColorHover;
    }
  }
}

.vaf-submenu-tree .el-tree {
  & {
    padding: $subMenuPadding;
    // width: $subMenuWidth;
    font-size: $subMenuFontSize;
    box-sizing: border-box;
  }

  .el-tree-node__expand-icon {
    margin-right: $subMenuIconMarginRight;
    padding: 0 $subMenuIconPadding;
    width: $subMenuIconWidth;
    text-align: center;
  }

  .el-tree-node__content {
    margin: $subMenuContentMargin 0;
    // width: $subMenuContentWidth;
    height: $subMenuContentHeight;
    color: $subMenuContentColor;
    border-radius: 3px;
    box-sizing: border-box;

    &:hover {
      color: $subMenuContentColorHover;
      background-color: transparent;

      .custom-label {
        color: $subMenuContentColorHover;
      }
    }

    .custom-label {
      padding-right: 8px;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-decoration: none;
      color: $subMenuContentColor;

      &>.custom-label__text {
        z-index: 1;
        display: inline;
      }
    }
  }

  .el-tree-node.is-current>.el-tree-node__content {
    background: $subMenuContentBgColorActive;

    .custom-label>.custom-label__text {
      color: $subMenuContentColorActive;
    }
  }
}
</style>
