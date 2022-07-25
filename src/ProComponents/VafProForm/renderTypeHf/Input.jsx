function renderTypeInput(prop, typeProps = {}) {
  return (
    <el-input
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeInput;
