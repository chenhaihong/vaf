<template>
  <el-config-provider :locale="locale">
    <div class="vaf-app">
      <VafGroundLayout />
    </div>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/es/locale/lang/zh-cn";

import VafGroundLayout from "@/common/layouts/VafGroundLayout.vue";

export default {
  name: "VafApp",
  components: { VafGroundLayout },
  data() {
    return {
      locale: zhCn,
    };
  },
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
