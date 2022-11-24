function renderTypeDatePicker(prop, typeProps = {}) {
  return (
    <el-date-picker
      type="date"
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-date-picker>
  );
}

export default renderTypeDatePicker;
