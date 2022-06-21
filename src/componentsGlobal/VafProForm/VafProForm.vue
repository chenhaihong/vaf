<script lang="jsx" setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script lang="jsx">
/**
 * VafProForm -- 配置式的表单组件
 * <vaf-pro-form :fields="fields" @submit="submit" />
 */

import { ElMessage } from "element-plus";

import renderType from "./renderType";

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
        if (valid) {
          this.$emit("submit", this.model);
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
      this.$refs["form"].resetFields();
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
        prop, // 字段名, (对应model中的属性名)
        label, // 子组件的label
        rules, // 子组件的校验规则

        // formItemProps: 可以传递给el-form-item的属性，参考el-form的API.
        // https://element-plus.gitee.io/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        // https://element-plus.org/zh-CN/component/form.html#form-item-%E5%B1%9E%E6%80%A7
        formItemProps = {},
      } = field;

      let child = renderType.call(this, field);

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
      <el-form
        ref="form"
        model={model}
        className="vaf-pro-form"
        {...restFormProps}
      >
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

<style lang="scss">
@include b(pro-form) {
}
</style>
