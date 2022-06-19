<script lang="jsx" setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script lang="jsx">
/**
 * VafProForm -- 配置式的表单组件
 * <vaf-pro-form :fields="fields" @submit="submit" />
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
    const defaultModel = {};
    this.fields.forEach((field) => {
      defaultModel[field.prop] = field.defaultValue;
    });
    this.model = defaultModel;
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
    /**
     * 高频表单组件
     */
    renderTypeCascader(prop, typeProps = {}) {
      return (
        <el-cascader v-model={this.model[prop]} {...typeProps}></el-cascader>
      );
    },
    renderTypeCheckbox(prop, typeProps = {}) {
      return (
        <el-checkbox v-model={this.model[prop]} {...typeProps}></el-checkbox>
      );
    },
    renderTypeCheckboxGroup(prop, typeProps = {}, options = []) {
      return (
        <el-checkbox-group v-model={this.model[prop]} {...typeProps}>
          {options.map((option) => {
            return (
              <el-checkbox label={option.value}>{option.label}</el-checkbox>
            );
          })}
        </el-checkbox-group>
      );
    },
    renderTypeInput(prop, typeProps = {}) {
      return <el-input v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeInputNumber(prop, typeProps = {}) {
      return <el-input-number v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeRadioGroup(prop, typeProps = {}, options = []) {
      return (
        <el-radio-group v-model={this.model[prop]}>
          {options.map((option) => {
            return <el-radio label={option.value}>{option.label}</el-radio>;
          })}
        </el-radio-group>
      );
    },
    renderTypeSelect(prop, typeProps = {}, options = []) {
      return (
        <el-select v-model={this.model[prop]} {...typeProps}>
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
    },
    renderTypeSwitch(prop, typeProps = {}) {
      return <el-switch v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeTextarea(prop, typeProps = {}) {
      return (
        <el-input
          type="textarea"
          v-model={this.model[prop]}
          {...typeProps}
        ></el-input>
      );
    },
    /**
     * 低频表单组件
     */
    renderTypeColorPicker(prop, typeProps = {}) {
      return <el-color-picker v-model={this.model[prop]} {...typeProps} />;
    },
    renderTypeDate(prop, typeProps = {}) {
      return (
        <el-date-picker
          type="date"
          v-model={this.model[prop]}
          {...typeProps}
        ></el-date-picker>
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
        // type: 表单子组件的类型，与elemeng-plus保持一致,可以是以下值：
        // (1)高频表单组件
        //     cascader(√), checkbox(√), checkbox-group(√),
        //     input(√), input-number(√),
        //     radio(×, 这种类型不应该存在,使用radio-group), radio-group(√),
        //     select(√), switch(√),
        //     textarea(√),
        // (2)低频表单组件
        //     color-picker,
        //     date-picker, datetime-picker,
        //     rate,
        //     slider,
        //     time-picker, time-select, transfer(不支持),
        //     upload,
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
        /**
         * 高频表单组件
         */
        case "cascader":
          child = this.renderTypeCascader(prop, typeProps);
          break;
        case "checkbox":
          child = this.renderTypeCheckbox(prop, typeProps);
          break;
        case "checkbox-group":
          child = this.renderTypeCheckboxGroup(prop, typeProps, field.options);
          break;
        case "input":
          child = this.renderTypeInput(prop, typeProps);
          break;
        case "input-number":
          child = this.renderTypeInputNumber(prop, typeProps);
          break;
        case "radio-group":
          child = this.renderTypeRadioGroup(prop, typeProps, field.options);
          break;
        case "select":
          child = this.renderTypeSelect(prop, typeProps, field.options);
          break;
        case "switch":
          child = this.renderTypeSwitch(prop, typeProps);
          break;
        case "textarea":
          child = this.renderTypeTextarea(prop, typeProps);
          break;
        /**
         * 低频表单组件
         */
        case "color-picker":
          child = this.renderTypeColorPicker(prop, typeProps);
          break;
        case "date":
          child = this.renderTypeDate(prop, typeProps);
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
