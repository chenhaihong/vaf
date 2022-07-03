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
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
