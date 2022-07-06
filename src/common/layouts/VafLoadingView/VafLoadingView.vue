<template>
  <div
    v-loading="true"
    :element-loading-text="loadingText"
    class="vaf-loading-view"
  />
</template>

<script>
export default {
  name: "VafLoadingView",
  computed: {
    loadingText() {
      return this.$vafAppConfig?.settingConfig?.name || "加载用户信息";
    },
  },
};
</script>

<style lang="scss">
@include b(loading-view) {
  width: 100%;
  height: 100%;
}
</style>
