function renderTypeInputNumber(prop, typeProps = {}) {
  return <el-input-number v-model={this.model[prop]} {...typeProps} />;
}

export default renderTypeInputNumber;
