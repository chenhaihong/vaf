function renderTypeCascader(prop, typeProps = {}) {
  return <el-cascader v-model={this.model[prop]} {...typeProps}></el-cascader>;
}

export default renderTypeCascader;
