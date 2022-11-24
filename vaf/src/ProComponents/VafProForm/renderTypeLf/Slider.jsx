function renderTypeSlider(prop, typeProps = {}) {
  return (
    <el-slider
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeSlider;
