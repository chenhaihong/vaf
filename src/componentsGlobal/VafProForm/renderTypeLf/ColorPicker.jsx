function renderTypeColorPicker(prop, typeProps = {}) {
  return <el-color-picker v-model={this.model[prop]} {...typeProps} />;
}

export default renderTypeColorPicker;
