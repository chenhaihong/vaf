function renderTypeDateTimePicker(prop, typeProps = {}) {
  return (
    <el-date-picker
      type="datetime"
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-date-picker>
  );
}

export default renderTypeDateTimePicker;
