function renderTypeDateTimePicker(prop, typeProps = {}) {
  return (
    <el-date-picker
      type="datetime"
      v-model={this.model[prop]}
      {...typeProps}
    ></el-date-picker>
  );
}

export default renderTypeDateTimePicker;
