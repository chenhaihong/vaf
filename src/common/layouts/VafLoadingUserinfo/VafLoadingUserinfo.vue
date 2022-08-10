<template>
  <div v-loading="true" :element-loading-text="text" class="vaf-loading-userinfo" />
</template>

<script>

export default {
  name: "VafLoadingUserinfo",
  props: {
    loadingText: { type: String },
  },
  computed: {
    text() {
      if (this.loadingText) return this.loadingText;
      return this.$vafAppConfig?.settingConfig?.name || "加载用户信息";
    },
  },
};
</script>

<style lang="scss">
@include b(loading-userinfo) {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
