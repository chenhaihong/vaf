function renderTypeTimeSelect(prop, typeProps = {}) {
  return (
    <el-time-select v-model={this.model[prop]} {...typeProps}></el-time-select>
  );
}

export default renderTypeTimeSelect;
