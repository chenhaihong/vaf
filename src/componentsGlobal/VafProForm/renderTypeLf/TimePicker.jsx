function renderTypeTimePicker(prop, typeProps = {}) {
  return (
    <el-time-picker
      type="time"
      v-model={this.model[prop]}
      {...typeProps}
    ></el-time-picker>
  );
}

export default renderTypeTimePicker;
