<template>
  <div class="vaf-app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "VafApp",
};
</script>

<style lang="scss">
@include b(app) {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  // background: yellow;
}
</style>
