<script lang="jsx">
export default {
  name: "VafFragment",
  functional: true,
  render() {
    const children = this.$slots.default();
    if (children.length === 1) {
      return children[0];
    }
    return <>{children}</>;
  },
};
</script>
