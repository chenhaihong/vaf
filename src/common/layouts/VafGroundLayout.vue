<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
      <component :is="isLoadingUserinfo ? 'VafLoadingUserinfo' : Component" />
    </transition>
  </router-view>
</template>

<script>
import { getUseAuthStore } from "@/common/stores";
import VafLoadingUserinfo from "./VafLoadingUserinfo/VafLoadingUserinfo.vue";

export default {
  name: "VafGroundLayout",
  components: {
    VafLoadingUserinfo,
  },
  computed: {
    isLoadingUserinfo() {
      const store = getUseAuthStore(this.$vafAppId)();
      return store.isLoadingUserinfo;
    },
  },
};
</script>
