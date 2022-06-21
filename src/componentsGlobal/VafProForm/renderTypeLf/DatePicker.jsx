function renderTypeDatePicker(prop, typeProps = {}) {
  return (
    <el-date-picker
      type="date"
      v-model={this.model[prop]}
      {...typeProps}
    ></el-date-picker>
  );
}

export default renderTypeDatePicker;
