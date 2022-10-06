<template>
  <div class="vaf-page-layout">
    <VafSidebar ref="sidebar" class="vaf-page-layout__left" @mouseenter="enterLayoutLeft"
      @mouseleave="leaveLayoutLeft" />
    <div class="vaf-page-layout__right">
      <VafNavbar class="vaf-page-layout__right__navbar" />
      <VafHistoryBar class="vaf-page-layout__right__history-bar" />
      <el-backtop :target="'.' + scrollbarWrapId" />
      <el-scrollbar ref="scrollbar" :native="true" always :wrap-class="scrollbarWrapId">
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.VafTransition || 'vaf-slide-left'" mode="out-in" appear>
            <!-- 
              keep-alive源码
              https://github.com/vuejs/core/blob/main/packages/runtime-core/src/components/KeepAlive.ts
              
              因为在组件卸载时, 会清除所有实例缓存, 所以不要在keep-alive上使用v-if指令.
              https://github.com/vuejs/core/blob/fb3bfde26468f3fc455d09599ae526c72dd053ee/packages/runtime-core/src/components/KeepAlive.ts#L228
             -->
            <keep-alive :include="include">
              <component :is="wrap(route.fullPath, Component)" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { h } from "vue";

import { getUseHistoryBarStore } from "@/common/stores";

import VafSidebar from "./VafSideBar/VafSidebar.vue";
import VafNavbar from "./VafNavbar/VafNavbar.vue";
import VafHistoryBar from "./VafHistoryBar/VafHistoryBar.vue";

// 自定义name的壳的集合
const wrapperMap = new Map();

export default {
  name: "VafPageLayout",
  components: { VafSidebar, VafNavbar, VafHistoryBar },
  data() {
    return {
      // scrollBehavior里会使用这个标识符来获取scrollbar__wrap容器,
      // 用于重置scrollbar的滚动位置到 {x: 0, y: 0}
      scrollbarWrapId: "scrollbar__wrap--" + this.$vafAppId,
    };
  },
  computed: {
    // include用于VafPageLayout里的keep-alive组件, 作为keep-alive的inlcude属性.
    // include更新后, keep-alive会自动删除缓存的包壳组件
    include() {
      const store = getUseHistoryBarStore(this.$vafAppId)();
      return store.list.map((item) => item.fullPath);
    },
  },
  methods: {
    // 为keep-alive里的component接收的组件包上一层自定义name的壳
    wrap(fullPath, component) {
      let wrapper;

      const wrapperName = fullPath;
      if (wrapperMap.has(wrapperName)) {
        wrapper = wrapperMap.get(wrapperName);
      } else {
        wrapper = {
          name: wrapperName,
          render() {
            return h("div", { className: "vaf-page-wrapper" }, component);
          },
        };
        wrapperMap.set(wrapperName, wrapper);
      }

      return h(wrapper);
    },
    // 更新左layout与右layout的z-index值，enter左layout时才去提升左layout的z-index层级，
    // 不让业务开发考虑将弹出框插到body里，来避免z-index层级的思考问题
    enterLayoutLeft() {
      this.outId && clearTimeout(this.outId);
      this.$refs.sidebar?.$el.classList.add('is-enter');
    },
    leaveLayoutLeft() {
      this.outId && clearTimeout(this.outId);

      // 如果sidebar的浮动子菜单显示的话，延迟到浮动子菜单关闭，才移除is-enter样式
      if (this.$refs.sidebar?.showHoverSubmenu) {
        this.outId = setTimeout(() => {
          this.$refs.sidebar?.$el.classList.remove('is-enter');
        }, 200);
      } else {
        this.$refs.sidebar?.$el.classList.remove('is-enter');
      }
    },
  },
  unmounted() {
    this.outId && clearTimeout(this.outId);
  },
};
</script>

<style lang="scss">
@include b(page-layout) {
  @include flex(row, nowrap, flex-start, stretch);

  position: relative;
  width: 100%;
  height: 100%;
  background: $subMenuBgColor;
  overflow: hidden;
}

@include e(left) {
  z-index: 0;
  flex-shrink: 0;
  @include flex(row, nowrap, flex-start, stretch);

  @include when(enter) {
    z-index: $sidebarZIndex;
  }
}

@include e(right) {
  @include flex(column, nowrap, flex-start, stretch);

  z-index: $sidebarZIndex - 1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .el-backtop {
    position: absolute;
  }
}

@include e(right__navbar) {
  flex-shrink: 0;
}

@include e(right__history-bar) {
  flex-shrink: 0;
}
</style>
