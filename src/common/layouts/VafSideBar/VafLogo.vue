<script lang="jsx">
export default {
  name: "VafLogo",
  render() {
    const logo = this.$vafAppConfig.leftmenuConfig?.logo || "";

    const props = {
      alt: "logo",
      fit: "contain",
      src: logo,
    };

    return (
      <div class="vaf-logo">
        <el-image class="vaf-logo__img" {...props}></el-image>
      </div>
    );
  },
};
</script>

<style lang="scss">
@include b(logo) {
  height: $navbarHeight;
  line-height: $navbarHeight;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  @include e(img) {
    width: 100%;
    height: 100%;
  }
}
</style>
