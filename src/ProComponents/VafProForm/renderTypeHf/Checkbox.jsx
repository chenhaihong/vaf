function renderTypeCheckbox(prop, typeProps = {}) {
  return <el-checkbox v-model={this.model[prop]} {...typeProps}></el-checkbox>;
}

export default renderTypeCheckbox;
