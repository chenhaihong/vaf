<script lang="jsx">
function renderTypeRate(prop, typeProps = {}) {
  return (
    <el-rate
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeRate;
</script>

<style lang="scss">
@include b(pro-form) {
  // 修复评分组件不垂直居中的bug
  .el-rate .el-rate__icon {
    vertical-align: middle;
  }
}
</style>
