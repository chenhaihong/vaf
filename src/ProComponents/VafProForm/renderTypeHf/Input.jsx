function renderTypeInput(prop, typeProps = {}) {
  return <el-input v-model={this.model[prop]} {...typeProps} />;
}

export default renderTypeInput;
