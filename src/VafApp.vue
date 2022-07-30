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
  // 卸载时, 移除VafApp\router\store\request等实例的显示引用
};
</script>

<style lang="scss">
@include b(app) {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
