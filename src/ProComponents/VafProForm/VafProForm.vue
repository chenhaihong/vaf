<script lang="jsx" setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script lang="jsx">
/**
 * VafProForm -- 配置式的表单组件
 * <vaf-pro-form :fields="fields" @submit="submit" />
 */

import { ElMessage } from "element-plus";

import renderAnySlot from "./renderAnySlot";
import renderType from "./renderType";

export default {
  name: "VafProForm",
  inheritAttrs: false,
  data() {
    return {
      model: {},
    };
  },
  emits: ["submit"],
  expose: [
    "getElFormInstance",
    "getModel",
    "updateModel",
    "updateProp",
    "clearValidate",
    "submit",
    "reset",
  ],
  props: {
    // fields: 表单props. field类型参考表单的api
    fields: { type: Array, default: () => [] },
    // formProps: 可以传递给el-form的属性，参考el-form的API.
    formProps: { type: Object, default: () => {} },
    // hideSubmit: 是否隐藏提交按钮
    hideSubmit: { type: Boolean, default: false },
    // hideReset: 是否隐藏重置按钮
    hideReset: { type: Boolean, default: false },
  },
  created() {
    // 设置默认值
    const defaultModel = {};
    this.fields.forEach((field) => {
      if (field.prop) {
        defaultModel[field.prop] = field.defaultValue;
      }
    });
    this.model = defaultModel;
  },
  methods: {
    getElFormInstance() {
      return this.$refs.elForm;
    },
    getModel() {
      return { ...this.model };
    },
    updateModel(model) {
      this.model = { ...this.model, ...model };
    },
    updateProp(prop, value) {
      this.model[prop] = value;
    },
    clearValidate(props) {
      this.$refs.elForm?.clearValidate(props);
    },
    submit() {
      this.$refs["elForm"].validate((valid, fields) => {
        if (valid) {
          this.$emit("submit", { ...this.model });
        } else {
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
      this.$refs["elForm"].resetFields();
    },
  },

  render() {
    const model = this.model;

    const {
      // fields: 定义了el-form-item信息的配置数组.
      fields,

      // formProps: 可以传递给el-form的属性，参考el-form的API.
      // https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
      // https://element-plus.org/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
      formProps,

      hideSubmit,
      hideReset,
    } = this.$props;

    const formItems = fields.map((field) => {
      const {
        type, // 表单子组件的类型
        prop, // 字段名, (对应model中的属性名)
        label, // 子组件的label
        rules, // 子组件的校验规则

        // formItemProps: 可以传递给el-form-item的属性，参考el-form的API.
        // https://element-plus.gitee.io/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        // https://element-plus.org/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        formItemProps = {},
      } = field;

      const child =
        type === "any-slot"
          ? renderAnySlot.call(this, field, model)
          : renderType.call(this, field);

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

    const buttons = [
      hideSubmit ? null : (
        <el-button type="primary" icon={Search} onClick={this.submit}>
          查询
        </el-button>
      ),
      hideReset ? null : (
        <el-button type="default" icon={Brush} onClick={this.reset}>
          重置
        </el-button>
      ),
    ];
    const buttonsFormItem =
      hideSubmit && hideReset ? null : <el-form-item>{buttons}</el-form-item>;

    // fix
    // 使用 className="vaf-pro-form" 会覆盖掉el-form的className,
    // 使用 class="vaf-pro-form"可以避免这个问题.
    return (
      <el-form ref="elForm" model={model} class="vaf-pro-form" {...formProps}>
        {formItems}
        {buttonsFormItem}
      </el-form>
    );
  },
};
</script>

<style lang="scss">
// @include b(pro-form) {
// }
</style>
