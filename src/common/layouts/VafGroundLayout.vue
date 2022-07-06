<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
      <component :is="isLoadingUserinfo ? 'vaf-loading-view' : Component" />
    </transition>
  </router-view>
</template>

<script>
import VafLoadingView from "./VafLoadingView/VafLoadingView.vue";

export default {
  name: "VafGroundLayout",
  components: {
    VafLoadingView,
  },
  computed: {
    isLoadingUserinfo() {
      return this.$store.state.VafAuth.isLoadingUserinfo;
    },
  },
};
</script>
