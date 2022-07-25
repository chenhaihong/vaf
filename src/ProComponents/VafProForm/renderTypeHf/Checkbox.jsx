function renderTypeCheckbox(prop, typeProps = {}) {
  return (
    <el-checkbox
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-checkbox>
  );
}

export default renderTypeCheckbox;
