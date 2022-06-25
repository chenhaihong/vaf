# vaf-pro-table

表格重组件.

## 1. vaf-pro-table 属性

| 属性                 | 说明                                          | 类型                   | 默认值                                         |
| -------------------- | --------------------------------------------- | ---------------------- | ---------------------------------------------- |
| `dataFunc`           | 异步函数, 用于获取表格数据                    | `Resolve<DataFuncRes>` | --                                             |
| `columns`            | 列配置, 参考 1.1                              | `ColumnConfig[]`       | `[]`                                           |
| `buttons`            | 按钮配置, 参考 1.2                            | `ButtonConfig[]`       | `[]`                                           |
| `defaultPagination`  | 分页的默认配置                                | `object`               | `{ pageIndex: 1, pageSize: 10, totalSize: 0 }` |
| `buttonsColumnProps` | 按钮列的属性, 与 el-table-column 属性保持一直 | `object`               | `{}`                                           |
| `tableProps`         | 表格的属性, 与 el-table 属性保持一直          | `object`               | `{}`                                           |
| `paginationProps`    | 分页器的属性, 与 el-pagination 属性保持一直   | `object`               | `{}`                                           |

```ts
type DataFuncRes = [
  error: null | ErrorInstance,
  data: {
    list: object[];
    pageIndex: number;
    pageSuze: number;
    total: number;
  }
];
```

## 1.1 列配置 - `ColumnConfig`

| 属性               | 说明                                                      | 类型                                                     | 默认值 |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------- | ------ |
| `type`             | 列类型, type 为 `any-slot \| expand` 时, 需要提供对应插槽 | `any-slot \| expand \| index \| selection \| text \| ''` | `''`   |
| `prop`             | 列属性, 对应列数据的字段名                                | `string`                                                 | --     |
| `label`            | 列标题, 如果没有设置, 则使用列属性                        | `string`                                                 | --     |
| `slot`             | type 为 `any-slot` 时, 通过该字段映射到对应插槽           | `string`                                                 | --     |
| `tableColumnProps` | 列属性的配置, 与 table-column 属性一致                    | 'object'                                                 | `{}`   |

## 1.2 按钮配置 - `ButtonConfig`

| 属性          | 说明                                  | 类型     | 默认值 |
| ------------- | ------------------------------------- | -------- | ------ |
| `command`     | 按钮操作名称                          | `string` | --     |
| `text`        | 按钮文本内容                          | `string` | --     |
| `buttonProps` | 组件属性的配置, 与 el-button 属性一致 | `object` | `{}`   |

## 2. vaf-pro-table 事件

| 事件名        | 说明                   | 回调参数                        |
| ------------- | ---------------------- | ------------------------------- |
| `clickButton` | 点击按钮时, 执行该函数 | `(command, row, index) => void` |

## 3. vaf-pro-table 方法

| 方法名               | 说明                     | 类型                    |
| -------------------- | ------------------------ | ----------------------- |
| `getElTableInstance` | 拿到内部的 el-table 实例 | `() => ELTableInstance` |
| `execDataFunc`       | 执行 `dataFunc` 函数     | `() => void`            |

## 4. vaf-pro-table 实例属性

| 属性         | 说明     | 类型     | 默认值                                         |
| ------------ | -------- | -------- | ---------------------------------------------- |
| `data`       | 列表数据 | `any[]`  | `[]`                                           |
| `pagination` | 分页数据 | `object` | `{ pageIndex: 1, pageSize: 10, totalSize: 0 }` |

## 5. 使用

```javascript

```
