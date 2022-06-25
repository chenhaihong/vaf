# vaf-pro-form

表单重组件。

## 1. 使用

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

export default {
  components: { VafProForm },
};
</script>
```

## 2. vaf-pro-form 属性

| 属性          | 说明                      | 类型      | 默认值  |
| ------------- | ------------------------- | --------- | ------- |
| `fields`      | 表单配置, 参考 2.1        | `Field[]` | `[]`    |
| `formProps`   | 提供对 el-form 属性的支持 | `object`  | `{}`    |
| `hide-submit` | 隐藏提交按钮              | `boolean` | `false` |
| `hide-reset`  | 隐藏重置按钮              | `boolean` | `false` |

### 2.1 表单配置 - `Field`

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

## 3. vaf-pro-form 事件

| 事件名   | 说明                       | 回调参数                  |
| -------- | -------------------------- | ------------------------- |
| `submit` | 验证表单成功后, 执行该函数 | `(model: Object) => void` |

## 4. vaf-pro-form 方法

| 方法名              | 说明                                               | 类型                   |
| ------------------- | -------------------------------------------------- | ---------------------- |
| `getElFormInstance` | 拿到内部的 el-form 实例                            | `() => ELFormInstance` |
| `submit`            | 验证表单, 成功则发布 `submit` 事件; 失败则提示错误 | `() => void`           |
| `reset`             | 重置表单值为初始值，并移除校验结果                 | `() => void`           |

## 5. vaf-pro-form 实例属性

| 属性    | 说明   | 类型     | 默认值 |
| ------- | ------ | -------- | ------ |
| `model` | 表单值 | `object` | `{}`   |
