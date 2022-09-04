<template>
  <div class="vaf-submenu-tree-wrap">
    <div v-if="!hideFirstNav" class="vaf-first-nav">
      <a v-if="selectedMainmenu" class="vaf-first-nav__name" @click.prevent="clickMenu(selectedMainmenu)"
        :href="resolveMenuHref(selectedMainmenu)">
        {{ selectedMainmenu ? selectedMainmenu.title : "" }}
      </a>
    </div>
    <div class="vaf-submenu-tree">
      <div v-if="ifToggle" class="vaf-submenu-tree-toggle" :class="{ 'is-collapsed': !expandedAll }">
        <el-icon class="vaf-submenu-tree-toggle__icon" @click="toggle">
          <ArrowUpBold />
        </el-icon>
      </div>
      <el-scrollbar always>
        <el-tree ref="subMenuTree" :data="submenu" empty-text="无菜单" node-key="id"
          :props="{ children: 'children', label: 'title' }" default-expand-all highlight-current :indent="8"
          :current-node-key="selectedSubmenuId" @node-click="clickMenu">
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
import { ArrowUpBold } from "@element-plus/icons-vue";
import confirmLink from "@/common/helpers/confirmLink.vue";

export default {
  name: "VafSubMenuTree",
  components: { ArrowUpBold },
  data() {
    return {
      expandedAll: true,
    };
  },
  props: {
    hideToggle: { type: Boolean, default: false },
    hideFirstNav: { type: Boolean, default: false },
    selectedMainmenu: { type: Object },
    selectedSubmenuId: { type: String, default: "" },
    submenu: { type: Array, default: () => [] },
  },
  computed: {
    // 当外部不关闭切换器，且子菜单的任意一个拥有子菜单时，才开启切换器
    ifToggle() {
      if (this.hideToggle) return false;
      const index = this.submenu?.findIndex(item => {
        return item.children?.length;
      });
      return index !== -1;
    },
  },
  watch: {
    selectedSubmenuId(next) {
      // 非点击submenu的tree-node方式切换路由时,
      // submenu的无法自动正常高亮目标tree-node,
      // 需要手动调api来高亮目标tree-node.
      this.$nextTick(this.setCurrentKey);
    },
    submenu() {
      // 帮助hover出来的子菜单高亮目标tree-node.
      this.$nextTick(this.setCurrentKey);

      if (this.ifToggle) {
        // 当子菜单发生改变时，因为默认展开所有子菜单，需要重置这个值为真
        this.expandedAll = true;
      }
    },
  },
  methods: {
    setCurrentKey() {
      this.$refs["subMenuTree"]?.setCurrentKey(this.selectedSubmenuId);
    },
    resolveMenuHref(menu = {}) {
      if (menu.type === "http-link") {
        return menu.path;
      }
      return this.$router.resolve(menu.path)?.href || menu.path;
    },
    async clickMenu(item) {
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
    // element-plus@2.2.15 展开全部节点与收起全部节点
    toggle() {
      const expandedAll = this.expandedAll;
      this.submenu.forEach((item) => {
        const node = this.$refs.subMenuTree?.store.getNode(item.id);
        expandedAll ? this.collapseAll(node) : this.expandAll(node);
      });
      this.expandedAll = !expandedAll;
    },
    // 展开全部节点
    expandAll(node) {
      if (!node || node?.isLeaf) return;
      !node.expanded && node.expand();
      node.childNodes?.forEach((node) => {
        this.expandAll(node);
      });
    },
    // 收起全部节点
    collapseAll(node) {
      if (!node || node?.isLeaf) return;
      node.expanded && node.collapse();
      node.childNodes?.forEach((node) => {
        this.collapseAll(node);
      });
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
  position: relative;
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

@include b(submenu-tree-toggle) {
  z-index: 2;
  position: absolute;
  top: 14px;
  right: 0;
  background: $mainMenuTextColorHover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  user-select: none;
  transform: translateX(80%);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateX(0);
    box-shadow: 0px 0px 4px rgba(200, 200, 200, 0.6);
  }

  @include e(icon) {
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out;
  }

  @include when(collapsed) {
    @include e(icon) {
      transform: rotate(180deg);
    }
  }
}
</style>
