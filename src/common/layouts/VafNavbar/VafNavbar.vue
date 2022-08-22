<template>
  <div class="vaf-navbar">
    <VafNav />
    <VafUserinfo v-if="ifUserinfo" />
  </div>
</template>

<script>
import { getUseNavbarStore } from "@/common/stores";

import VafNav from "./VafNav.vue";
import VafUserinfo from "./VafUserinfo.vue";

export default {
  name: "VafNavbar",
  components: {
    VafUserinfo, VafNav,
  },
  computed: {
    ifUserinfo() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.ifUserinfo;
    },
  },
};
</script>

<style lang="scss">
@include b(navbar) {
  z-index: $navbarZIndex;
  position: relative;
  padding: 0 10px;
  height: $navbarHeight;
  background-color: white;
  border-bottom: 1px solid $borderColor;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
