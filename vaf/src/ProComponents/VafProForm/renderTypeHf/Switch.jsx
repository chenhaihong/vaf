function renderTypeSwitch(prop, typeProps = {}) {
  return (
    <el-switch
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    />
  );
}

export default renderTypeSwitch;
