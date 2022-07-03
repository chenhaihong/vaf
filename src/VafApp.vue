<template>
  <div class="vaf-app">
    <VafGroundLayout />
  </div>
</template>

<script>
import VafGroundLayout from "@/common/layouts/VafGroundLayout.vue";

export default {
  name: "VafApp",
  components: { VafGroundLayout },
};
</script>

<style lang="scss">
@include b(app) {
  width: 100%;
  height: 100%;
}
</style>
