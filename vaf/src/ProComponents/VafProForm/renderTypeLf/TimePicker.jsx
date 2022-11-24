function renderTypeTimePicker(prop, typeProps = {}) {
  return (
    <el-time-picker
      type="time"
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-time-picker>
  );
}

export default renderTypeTimePicker;
