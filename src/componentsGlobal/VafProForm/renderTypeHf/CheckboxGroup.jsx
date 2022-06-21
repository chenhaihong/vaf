function renderTypeCheckboxGroup(prop, typeProps = {}, options = []) {
  return (
    <el-checkbox-group v-model={this.model[prop]} {...typeProps}>
      {options.map((option) => {
        return <el-checkbox label={option.value}>{option.label}</el-checkbox>;
      })}
    </el-checkbox-group>
  );
}

export default renderTypeCheckboxGroup;
