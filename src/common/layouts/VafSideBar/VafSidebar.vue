<template>
  <div class="vaf-sidebar">
    <div class="vaf-sidebar__left">
      <VafLogo />
      <VafMainmenu />
    </div>
    <div class="vaf-sidebar__right">
      <VafSubMenuTree />
    </div>
  </div>
</template>

<script>
import VafLogo from "./VafLogo.vue";
import VafMainmenu from "./VafMainmenu.vue";
import VafSubMenuTree from "./VafSubMenuTree.vue";

export default {
  name: "VafSideBar",
  components: {
    VafLogo,
    VafMainmenu,
    VafSubMenuTree,
  },
  watch: {
    "$route.matched": {
      immediate: true,
      handler(matched) {
        // console.log(JSON.stringify(matched, null, 2));

        // console.log(matched.map(item => item.path))
        if (!matched.length) return;

        // 找到孙子路由的meta里的VafLeftmenuId
        const VafLeftmenuId = matched[matched.length - 1].meta.VafLeftmenuId;
        // console.log(VafLeftmenuId);

        // 从leftmenu中找出选中的主菜单
        const mathedNodes = resolveMatchedNodes(
          VafLeftmenuId,
          this.$store.state.VafLeftmenu.menus
        );
        // console.log(JSON.stringify(mathedNodes, null, 2));

        if (!mathedNodes.length) return;

        this.$store.commit(
          "VafLeftmenu/setSelectedMainmenuId",
          mathedNodes[0].id
        );
        this.$store.commit("VafLeftmenu/setSelectedSubmenuId", VafLeftmenuId);

        // console.log(mathedNodes[0].id, VafLeftmenuId);
      },
    },
  },
};

// 从数组中查找出元素的所有父节点
function resolveMatchedNodes(id, nodes) {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      const { children, ...self } = node;
      result.push({ ...self });
    } else if (node.children) {
      const matched = resolveMatchedNodes(id, node.children);
      if (matched.length) {
        const { children, ...self } = node;
        result.push({ ...self });
        result.push(...matched);
      }
    }
  }
  return result;
}
</script>

<style lang="scss">
@include b(sidebar) {
  z-index: $sidebarZIndex;
  height: 100%;
  background-color: white;

  @include e(left) {
    width: $mainMenuWidth;
    height: 100%;
    background-color: $mainMenuBgColor;
    border-right: 1px solid $sideBarBorderColor;
    box-sizing: border-box;
  }

  @include e(right) {
    width: $subMenuWidth;
    height: 100%;
    background-color: $subMenuBgColor;
    box-sizing: border-box;

    .submenu-tree-wrapper--hover {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: $subMenuBgColor;
      display: inherit;
    }
  }
}
</style>
