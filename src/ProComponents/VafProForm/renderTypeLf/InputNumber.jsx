function renderTypeInputNumber(prop, typeProps = {}) {
  return (
    <el-input-number
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeInputNumber;
