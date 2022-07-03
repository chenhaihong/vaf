<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.VafTransition || 'vaf-fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "VafGroundLayout",
};
</script>
