function renderTypeSlider(prop, typeProps = {}) {
  return <el-slider v-model={this.model[prop]} {...typeProps} />;
}

export default renderTypeSlider;
