function renderTypeTimeSelect(prop, typeProps = {}) {
  return (
    <el-time-select
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-time-select>
  );
}

export default renderTypeTimeSelect;
