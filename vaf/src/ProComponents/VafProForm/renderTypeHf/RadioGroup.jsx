function renderTypeRadioGroup(prop, typeProps = {}, options = []) {
  return (
    <el-radio-group
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    >
      {options.map((option) => {
        return <el-radio label={option.value}>{option.label}</el-radio>;
      })}
    </el-radio-group>
  );
}

export default renderTypeRadioGroup;
