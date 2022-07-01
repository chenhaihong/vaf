<template>
  <div class="vaf-page-layout">
    <VafSidebar class="vaf-page-layout__left" />
    <div class="vaf-page-layout__right">
      <VafNavbar class="vaf-page-layout__right__navbar" />
      <el-scrollbar :native="false" always>
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
