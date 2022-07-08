<template>
  <router-view v-show="!isLoadingUserinfo" v-slot="{ Component, route }">
    <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <vaf-loading-view v-if="isLoadingUserinfo" />
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
