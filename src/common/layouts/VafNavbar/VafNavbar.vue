<template>
  <div class="vaf-navbar">
    <VafUserinfo />
    <!-- <component :is="VafNavBarRight"></component> -->
  </div>
</template>

<script>
import VafUserinfo from "./VafUserinfo.vue";

export default {
  name: "VafNavbar",
  components: {
    VafUserinfo,
  },
  // data() {
  //   return {
  //     VafNavBarRight: "VafNavBarRight",
  //   };
  // },
};
</script>

<style lang="scss">
@include b(navbar) {
  z-index: $navbarZIndex;
  position: relative;
  height: $navbarHeight;
  background-color: white;
  border-bottom: 1px solid $borderColor;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
