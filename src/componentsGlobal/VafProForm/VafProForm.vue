<script lang="jsx" setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script lang="jsx">
/**
 * VafProForm -- 配置式的表单组件
 * <vaf-pro-form :source="getList" :fields="fields" />
 */

import { ElMessage } from "element-plus";
import { Search, Brush } from "@element-plus/icons-vue";

export default {
  name: "VafProForm",
  data() {
    return {
      model: {},
    };
  },
  props: {
    // fields: 表单props. field类型参考表单的api
    fields: { type: Array, default: () => [] },
  },
  created() {
    // 设置默认值
    const model = {};
    this.fields.forEach((field) => {
      model[field.prop] = field.value;
    });
    this.model = model;
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid, fields) => {
        // console.log(JSON.stringify(this.model, null, 2));
        if (valid) {
          console.log("submit!");
          this.$emit("submit", this.model);
        } else {
          console.log("error submit!", fields);
          Object.values(fields).forEach((field, index) => {
            // 处理消息框重叠的问题
            setTimeout(() => {
              ElMessage.error(field[0].message);
            }, 20 * index);
          });
        }
      });
    },
    reset() {
      this.$refs["form"].resetFields();
    },
    renderTypeCascader(prop, typeProps = {}) {},
    renderTypeColorPicker(prop, typeProps = {}) {
      return <el-color-picker v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeInput(prop, typeProps = {}) {
      return <el-input v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeSwitch(prop, typeProps = {}) {
      return <el-switch v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeSelect(prop, options = [], typeProps = {}) {
      return (
        <el-select v-model={this.model[prop]} {...typeProps}>
          {options.map((option) => {
            return (
              <el-option
                v-model={this.model[prop]}
                label={option.label}
                value={option.value}
              ></el-option>
            );
          })}
        </el-select>
      );
    },
  },

  render() {
    const model = this.model;

    const {
      // fields: 定义了el-form-item信息的配置数组.
      fields,

      // restFormProps: 可以传递给el-form的属性，参考el-form的API.
      // https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
      // https://element-plus.org/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
      ...restFormProps
    } = this.$props;

    const formItems = fields.map((field) => {
      const {
        // type: 表单子组件的类型，与elemeng-plus保持一致,可以是:
        //     cascader, checkbox, checkbox-group, color-picker, date, datetime,
        //     input, input-number, radio, rate, select,
        //     slider, switch, textarea, time, upload,
        type,

        prop, // 字段名, (对应model中的属性名)
        value, // 可以设置model的默认值
        label, // 子组件的label
        rules, // 子组件的校验规则

        // formItemProps: 可以传递给el-form-item的属性，参考el-form的API.
        // https://element-plus.gitee.io/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        // https://element-plus.org/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        formItemProps = {},

        // typeProps: 可以传递给表单子组件的属性，参考表单组件的API.
        typeProps = {},
      } = field;

      let child = null;
      switch (type) {
        case "color-picker":
          child = this.renderTypeColorPicker(prop, typeProps);
          break;
        case "input":
          child = this.renderTypeInput(prop, typeProps);
          break;
        case "select":
          child = this.renderTypeSelect(prop, field.options, typeProps);
          break;
        case "switch":
          child = this.renderTypeSwitch(prop, typeProps);
          break;
        case "radio":
          child = (
            <el-radio-group v-model={model[field.name]}>
              {field.options.map((option) => {
                return <el-radio label={option.value}>{option.label}</el-radio>;
              })}
            </el-radio-group>
          );
          break;
        case "checkbox":
          child = (
            <el-checkbox-group v-model={model[field.name]}>
              {field.options.map((option) => {
                return (
                  <el-checkbox label={option.value}>{option.label}</el-checkbox>
                );
              })}
            </el-checkbox-group>
          );
          break;
        case "textarea":
          child = (
            <el-input
              v-model={model[field.name]}
              placeholder={field.placeholder}
              type="textarea"
            ></el-input>
          );
          break;
        case "date":
          child = (
            <el-date-picker
              v-model={model[field.name]}
              type="date"
              placeholder={field.placeholder}
            ></el-date-picker>
          );
          break;
      }

      return (
        <el-form-item
          key={prop}
          prop={prop}
          label={label}
          rules={rules}
          {...formItemProps}
        >
          {child}
        </el-form-item>
      );
    });

    return (
      <el-form ref="form" model={model} {...restFormProps}>
        {formItems}
        <el-form-item>
          <el-button type="primary" icon={Search} onClick={this.submit}>
            查询
          </el-button>
          <el-button type="default" icon={Brush} onClick={this.reset}>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    );
  },
};
</script>

<style lang="scss"></style>
