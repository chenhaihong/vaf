# vaf-pro-form

表单重组件。

## 1. vaf-pro-form 属性

| 属性          | 说明                      | 类型      | 默认值  |
| ------------- | ------------------------- | --------- | ------- |
| `fields`      | 表单配置, 参考 1.1        | `Field[]` | `[]`    |
| `formProps`   | 提供对 el-form 属性的支持 | `object`  | `{}`    |
| `hide-submit` | 隐藏提交按钮              | `boolean` | `false` |
| `hide-reset`  | 隐藏重置按钮              | `boolean` | `false` |

### 1.1 表单配置 - `Field`

| 属性            | 说明                                                                    | 类型                             | 默认值 |
| --------------- | ----------------------------------------------------------------------- | -------------------------------- | ------ |
| `type`          | 表单子组件的类型                                                        | 参考高频类型, 低频类型           | --     |
| `prop`          | `model` 的键名                                                          | `string`                         | --     |
| `label`         | 标签文本                                                                | `string`                         | --     |
| `defaultValue`  | 默认值                                                                  | `any`                            | --     |
| `options`       | `type` 为 `checkbox-group, radio-group, select`时, 使用该字段来支持选项 | `any`                            | --     |
| `rules`         | 表单验证规则, 参考 element-plus 表单组件的 API                          | `FormItemRule \| FormItemRule[]` | --     |
| `typeProps`     | API 传递给表单子组件的属性, 参考 element-plus 表单组件的 API            | `object`                         | `{}`   |
| `formItemProps` | 可以传递给 el-form-item 的属性，参考 el-form 的 API                     | `object`                         | `{}`   |

- 表单子组件类型 : `cascader | checkbox | checkbox-group | input | radio-group | select | switch | textarea` .
- 表单子组件类型 : `color-picker | date-picker | datetime-picker | input-number | rate | slider | time-picker | time-select | upload` .
- `type` 为 `cascader`时，在 `typeProps` 中添加 `options` 字段来支持选项.

## 2. vaf-pro-form 事件

| 事件名   | 说明                       | 回调参数                  |
| -------- | -------------------------- | ------------------------- |
| `submit` | 验证表单成功后, 执行该函数 | `(model: Object) => void` |

## 3. vaf-pro-form 方法

| 方法名              | 说明                                               | 类型                   |
| ------------------- | -------------------------------------------------- | ---------------------- |
| `getElFormInstance` | 拿到内部的 el-form 实例                            | `() => ELFormInstance` |
| `submit`            | 验证表单, 成功则发布 `submit` 事件; 失败则提示错误 | `() => void`           |
| `reset`             | 重置表单值为初始值，并移除校验结果                 | `() => void`           |

## 4. vaf-pro-form 实例属性

| 属性    | 说明   | 类型     | 默认值 |
| ------- | ------ | -------- | ------ |
| `model` | 表单值 | `object` | `{}`   |

## 5. 使用示例

```javascript
<template>
  <vaf-pro-form
    ref="vafproform"
    :fields="fields"
    :formProps="{ inline: false, 'label-width': 180 }"
    @submit="submit"
  />
</template>

<script>
import { VafProForm } from '@erye/vaf';

<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px; text-align: center">vaf-pro-form</h1>
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">1. 高频表单组件</h2>
          <vaf-pro-form
            :fields="fields1"
            :hide-submit="false"
            :hide-reset="false"
            @submit="submit"
            :formProps="{
              inline: false,
              'label-width': 180,
            }"
          />
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">2. 低频表单组件</h2>
          <vaf-pro-form
            :fields="fields2"
            hide-reset
            @submit="submit"
            :formProps="{
              inline: false,
              'label-width': 180,
            }"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
const cascaderOptions = [
  {
    value: "lv1",
    label: "Lv1",
    children: [
      {
        value: "lv1-1",
        label: "Lv1-1",
        children: [
          { value: "lv1-1-1", label: "Lv1-1-1" },
          { value: "lv1-1-2", label: "Lv1-1-2" },
        ],
      },
      {
        value: "lv1-2",
        label: "Lv1-2",
        children: [
          { value: "lv1-2-1", label: "Lv1-2-1" },
          { value: "lv1-2-2", label: "Lv1-2-2" },
        ],
      },
    ],
  },
  {
    value: "lv2",
    label: "Lv2",
    children: [
      {
        value: "lv2-1",
        label: "Lv2-1",
        children: [
          { value: "lv2-1-1", label: "Lv2-1-1" },
          { value: "lv2-1-2", label: "Lv2-1-2" },
        ],
      },
    ],
  },
];

export default {
  components: { VafProForm },
  data() {
    // 高频表单组件
    const fields1 = [
      {
        type: "cascader",
        prop: "prop_cascader",
        label: "级联选择器",
        defaultValue: ["lv1", "lv1-1", "lv1-1-1"],
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        typeProps: {
          options: cascaderOptions,
        },
      },
      {
        type: "checkbox",
        prop: "prop_checkbox",
        defaultValue: true,
        label: "多选框",
        rules: [
          {
            required: true,
            message: "请选择其是否自动开启",
            trigger: "blur",
          },
        ],
      },
      {
        type: "checkbox-group",
        prop: "prop_checkbox-group",
        defaultValue: [1],
        label: "多选框组",
        options: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
        ],
        rules: [
          {
            required: true,
            message: "请选择多选框",
            trigger: "blur",
          },
        ],
      },
      {
        type: "input",
        prop: "prop_input",
        defaultValue: "单行文本输入框",
        label: "单行文本输入框",
        rules: [
          {
            required: true,
            message: "请输入文本",
            trigger: "blur",
          },
        ],
      },
      {
        type: "radio-group",
        prop: "prop_radio-group",
        defaultValue: "male",
        label: "单选框组",
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
          { label: "其他", value: "other" },
        ],
        rules: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
      },
      {
        type: "select",
        prop: "prop_select",
        defaultValue: "2",
        label: "选择器",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
        rules: [
          {
            required: true,
            message: "请选择选项",
            trigger: "blur",
          },
        ],
      },
      {
        type: "switch",
        prop: "prop_switch_1",
        defaultValue: true,
        label: "开关-默认",
        rules: [
          {
            required: true,
            message: "请选择是否启用",
            trigger: "blur",
          },
        ],
      },
      {
        type: "switch",
        prop: "prop_switch_2",
        defaultValue: 1,
        label: "开关-自定义",
        typeProps: {
          activeValue: 1,
          inactiveValue: 2,
          activeText: "是",
          inactiveText: "否",
        },
      },
      {
        type: "textarea",
        prop: "prop_textarea",
        defaultValue: "多行文本输入框",
        label: "多行文本输入框",
        rules: [
          {
            required: true,
            message: "请输入活动描述",
            trigger: "blur",
          },
        ],
      },
    ];

    // 低频表单组件
    const fields2 = [
      {
        type: "color-picker",
        prop: "prop_color-picker",
        defaultValue: "#ff00ff",
        label: "颜色选择器",
        rules: [],
        typeProps: {},
        formItemProps: {},
      },
      {
        type: "date-picker",
        prop: "prop_date-picker",
        label: "日期选择器",
        defaultValue: 1655654400000,
        rules: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
      {
        type: "datetime-picker",
        prop: "prop_datetime-picker",
        label: "日期时间选择器",
        defaultValue: 1655686800000,
        rules: [
          {
            required: true,
            message: "请选择日期时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
      {
        type: "input-number",
        prop: "prop_input-number",
        defaultValue: 0,
        label: "数字输入框",
        rules: [
          {
            required: true,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
      },
      {
        type: "rate",
        prop: "prop_rate",
        defaultValue: 8.5,
        label: "评分",
        rules: [
          {
            required: true,
            message: "请输入评分",
            trigger: "blur",
          },
        ],
        typeProps: {
          allowHalf: true,
          max: 10,
          size: "large",
          showScore: true,
        },
        formItemProps: {
          size: "large",
        },
      },
      {
        type: "slider",
        prop: "prop_slider",
        defaultValue: 80,
        label: "滑块",
        rules: [
          {
            required: true,
            message: "请拖动滑块",
            trigger: "blur",
          },
        ],
        typeProps: {
          height: "100px",
          min: 60,
          max: 100,
          vertical: true,
          showInput: true,
        },
        formItemProps: {},
      },
      {
        type: "time-picker",
        prop: "prop_time-picker_1",
        label: "时间选择器_默认",
        defaultValue: 1655686800000,
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
      {
        type: "time-picker",
        prop: "prop_time-picker_2",
        label: "时间选择器_自定义",
        defaultValue: [1655686800000, 1655697600000],
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          isRange: true,
          valueFormat: "x",
        },
      },
      {
        type: "time-select",
        prop: "prop_time-select",
        label: "时间下拉选择器",
        defaultValue: "2022-06-20 18:00:00 +08:00Z",
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          format: "YYYY-MM-DD HH:mm:ss Z[Z]",
        },
      },
      {
        type: "upload",
        prop: "prop_upload",
        label: "上传",
        defaultValue: [
          {
            name: "deer.png",
            url: "https://map.tiiit.cn/deer.png",
          },
        ],
        rules: [
          {
            required: false,
            message: "请上传图片",
            trigger: "blur",
          },
        ],
        typeProps: {
          action: "/vaf/upload",
          listType: "text",
          listType: "picture",
          listType: "picture-card",
        },
      },
    ];

    return {
      fields1, // 高频表单组件
      fields2, // 低频表单组件
    };
  },
  methods: {
    submit(data) {
      console.log(JSON.stringify(data, null, 2));
    },
  },
};
</script>
```
