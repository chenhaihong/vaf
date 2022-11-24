function renderTypeTextarea(prop, typeProps = {}) {
  return (
    <el-input
      type="textarea"
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    ></el-input>
  );
}

export default renderTypeTextarea;
