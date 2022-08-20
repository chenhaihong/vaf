<script lang="jsx">
import { withModifiers } from 'vue';

export default {
  name: "VafLogo",
  render() {
    const logo = this.$vafAppConfig?.leftmenuConfig?.logo || "";

    const props = {
      alt: "logo",
      fit: "contain",
      src: logo,
    };

    return (
      <a class="vaf-logo" onClick={withModifiers(this.handleClick, ['prevent'])} href={this.resolveHome()}>
        <el-image class="vaf-logo__img" {...props}></el-image>
      </a>
    );
  },
  methods: {
    handleClick() {
      this.$router.push("/");
    },
    resolveHome() {
      return this.$router.resolve('/')?.href || '/';
    },
  },
};
</script>

<style lang="scss">
@include b(logo) {
  display: block;
  height: $navbarHeight;
  line-height: $navbarHeight;
  font-size: 20px;
  text-align: center;
  text-decoration: none;

  @include e(img) {
    width: 100%;
    height: 100%;
  }
}
</style>
