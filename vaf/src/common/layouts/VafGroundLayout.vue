<template>
  <VafLoadingUserinfo v-if="isLoadingUserinfo" />
  <VafLoadingSidebarMenu v-else-if="showLoadingSidebarMenu" />
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template> 

<script lang="ts">
import { defineComponent } from "vue";
import { LoadingStatus } from "@/common/stores/createUseSidebarStore";

import { getUseAuthStore, getUseSidebarStore } from "@/common/stores";
import VafLoadingUserinfo from "./VafLoading/VafLoadingUserinfo.vue";
import VafLoadingSidebarMenu from "./VafLoading/VafLoadingSidebarMenu.vue";

declare module "vue-router" {
  interface RouteMeta {
    VafTransition: string;
  }
}

export default defineComponent({
  name: "VafGroundLayout",
  components: {
    VafLoadingUserinfo,
    VafLoadingSidebarMenu,
  },
  computed: {
    isLoadingUserinfo() {
      const store = getUseAuthStore(this.$vafAppId)();
      return store.isLoadingUserinfo;
    },
    showLoadingSidebarMenu() {
      const store = getUseSidebarStore(this.$vafAppId)();
      return [
        LoadingStatus.Waiting,
        LoadingStatus.Loading,
        LoadingStatus.Error,
      ].includes(store.loadingMenusStatus);
    },
  },
});
</script>
