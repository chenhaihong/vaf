<script lang="jsx">
export default {
  name: "VafFragment",
  functional: true,
  render() {
    return <>{this.$slots.default()}</>;
  },
};
</script>
