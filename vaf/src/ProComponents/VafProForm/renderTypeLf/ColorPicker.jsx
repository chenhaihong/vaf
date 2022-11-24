function renderTypeColorPicker(prop, typeProps = {}) {
  return (
    <el-color-picker
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeColorPicker;
