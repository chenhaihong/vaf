function renderTypeCascader(prop, typeProps = {}) {
  return (
    <el-cascader
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-cascader>
  );
}

export default renderTypeCascader;
