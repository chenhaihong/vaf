function renderTypeTextarea(prop, typeProps = {}) {
  return (
    <el-input
      type="textarea"
      v-model={this.model[prop]}
      {...typeProps}
    ></el-input>
  );
}

export default renderTypeTextarea;
