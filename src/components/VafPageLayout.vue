<template>
  <div class="vaf-page-layout">
    <VafSidebar class="vaf-page-layout__left" />
    <div class="vaf-page-layout__right">
      <VafNavbar class="vaf-page-layout__right__navbar" />
      <el-scrollbar ref="scrollbar" :native="false" always>
        <router-view v-slot="{ Component, route }">
          <transition
            :name="route.meta.VafTransition || 'vaf-fade'"
            mode="out-in"
            appear
          >
            <keep-alive>
              <component
                v-if="route.meta.VafKeepAlive"
                :is="Component"
                :key="route.fullPath"
              />
            </keep-alive>
          </transition>
          <transition
            :name="route.meta.VafTransition || 'vaf-fade'"
            mode="out-in"
            appear
          >
            <component v-if="!route.meta.VafKeepAlive" :is="Component" />
          </transition>
        </router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import VafSidebar from "@/components/VafSidebar.vue";
import VafNavbar from "@/components/VafNavbar.vue";

export default {
  name: "VafPageLayout",
  components: { VafSidebar, VafNavbar },
  removeAutoScrollGuard: null,
  mounted() {
    /**
     * 切换路由时时，自动滚动内容到顶部.
     *
     * 因为我在router-view外层套了一个scrollbar，造成vue-router的scroobehavior无法有效地控制滚动，
     * 所以需要在scrollBar上层级的组件上加上这个guard.
     *
     * 同时，有两种路由配置vanillaRoutes pageRoutes，vanillaRoutes不会使用VafPageLayout组件.
     * VafPageLayout这个layout组件是一个可选的组件，因而把控制滚动逻辑放在这里是比较正确地.
     *
     * 这个是router3的issue，但是很有参考价值.
     * Need a way to set what scroll position is saved #1187
     * https://github.com/vuejs/vue-router/issues/1187
     *
     * refer
     * https://github.com/vuejs/vue-router/issues/1187#issuecomment-500406965
     *
     * router.afterEach会返回一个删除guard的函数，这个函数可以在组件销毁时调用.
     * https://github.com/vuejs/router/blob/60e8b7a1ee729bafc5c9ff3646ac440ae629c333/packages/router/src/utils/callbacks.ts#L4
     */
    this.removeAutoScrollGuard = this.$router.afterEach(() => {
      this.$refs.scrollbar?.scrollTo(0, 0);
    });
  },
  beforeUnmount() {
    this.removeAutoScrollGuard && this.removeAutoScrollGuard();
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

// transition name="fade"
.vaf-fade-enter-from,
.vaf-fade-leave-to {
  opacity: 0;
}
.vaf-fade-enter-active,
.vaf-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.vaf-fade-enter-to,
.vaf-fade-leave-from {
  opacity: 1;
}
</style>
