function renderTypeSwitch(prop, typeProps = {}) {
  return <el-switch v-model={this.model[prop]} {...typeProps} />;
}

export default renderTypeSwitch;
