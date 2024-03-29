function renderTypeSelect(prop, typeProps = {}, options = []) {
  return (
    <el-select
      v-model={this.model[prop]}
      onChange={(value) => this.handlePropChange(prop, value)}
      {...typeProps}
    >
      {options.map((option) => {
        return (
          <el-option
            v-model={this.model[prop]}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
          ></el-option>
        );
      })}
    </el-select>
  );
}

export default renderTypeSelect;
