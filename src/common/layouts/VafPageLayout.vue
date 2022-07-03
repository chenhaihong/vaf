<template>
  <div class="vaf-page-layout">
    <VafSidebar class="vaf-page-layout__left" />
    <div class="vaf-page-layout__right">
      <VafNavbar class="vaf-page-layout__right__navbar" />
      <el-scrollbar
        ref="scrollbar"
        :native="false"
        always
        :wrap-class="scrollbarWrapId"
      >
        <router-view v-slot="{ Component, route }">
          <transition
            :name="route.meta.VafTransition || 'vaf-fade'"
            mode="out-in"
            appear
          >
            <!-- 
              keep-alive源码
              https://github.com/vuejs/core/blob/main/packages/runtime-core/src/components/KeepAlive.ts
              
              因为在组件卸载时, 会清除所有实例缓存, 所以不要在keep-alive上使用v-if指令.
              https://github.com/vuejs/core/blob/fb3bfde26468f3fc455d09599ae526c72dd053ee/packages/runtime-core/src/components/KeepAlive.ts#L228
             -->
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import VafSidebar from "./VafSideBar/VafSidebar.vue";
import VafNavbar from "./VafNavbar/VafNavbar.vue";

export default {
  name: "VafPageLayout",
  components: { VafSidebar, VafNavbar },
  data() {
    return {
      // scrollBehavior里会使用这个标识符来获取scrollbar__wrap容器,
      // 用于重置scrollbar的滚动位置到 {x: 0, y: 0}
      scrollbarWrapId: "scrollbar__wrap--" + this.$vafAppId,
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.VafTabmenuModule.cachedViews;
    },
  },
};
</script>

<style lang="scss">
@include b(page-layout) {
  @include flex(row, nowrap, flex-start, stretch);

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@include e(left) {
  flex-shrink: 0;
  @include flex(row, nowrap, flex-start, stretch);
}

@include e(right) {
  @include flex(column, nowrap, flex-start, stretch);

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@include e(right__navbar) {
  flex-shrink: 0;
}
</style>
