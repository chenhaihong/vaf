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

### 1.1 列配置 - `ColumnConfig`

| 属性               | 说明                                                      | 类型                                                     | 默认值 |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------- | ------ |
| `type`             | 列类型, type 为 `any-slot \| expand` 时, 需要提供对应插槽 | `any-slot \| expand \| index \| selection \| text \| ''` | `''`   |
| `prop`             | 列属性, 对应列数据的字段名                                | `string`                                                 | --     |
| `label`            | 列标题, 如果没有设置, 则使用列属性                        | `string`                                                 | --     |
| `slot`             | type 为 `any-slot` 时, 通过该字段映射到对应插槽           | `string`                                                 | --     |
| `tableColumnProps` | 列属性的配置, 与 table-column 属性一致                    | 'object'                                                 | `{}`   |

### 1.2 按钮配置 - `ButtonConfig`

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

## 5. vaf-pro-table 插槽

### 5.1 插槽 - `any-slot`

`vaf-pro-table` 添加 `any-slot` 任意插槽特性, 使得重组件表格也能有很强大的灵活性.

当添加了如下的列配置时, 需要添加名称为 `avatar` 的插槽.

```javascript
const columns = [{ type: "any-slot", label: '头像', slot: "avatar", tableColumnProps: {} }];

<template #avatar="{row, $index}">
  <el-avatar :src="row.avatar" />
</template>
```

### 5.2 插槽 - `expand`

```javascript
const columns = [{ type: "expand", label: '展开', tableColumnProps: {} }];

<template #expand="scope">
  这是第 {{ scope.$index }} 个插槽
</template>
```

## 6. 使用

```javascript
<template>
  <vaf-pro-table
    v-loading="loading"
    ref="vafprotable"
    :dataFunc="getList"
    :columns="columns"
    :buttons="buttons"
    :defaultPagination="{ pageIndex: 2, pageSize: 10, totalSize: 0 }"
    @clickButton="clickButton"
    :tableProps="{ border: true, stripe: true }"
    :paginationProps="{
      background: false,
      layout: 'total, sizes, prev, pager, next, jumper',
    }"
    :buttonsColumnProps="{ width: '160px' }"
  >
    <template #expand="scope">
      这是第 {{ scope.$index }} 个插槽
    </template>
    <template #avatar="scope">
      <el-avatar :src="scope.row.avatar" />
    </template>
  </vaf-pro-table>
</template>

<script>
export default {
  data() {
    const columns = [
      {
        type: "selection",
        prop: "color",
        tableColumnProps: {},
      },
      {
        type: "index",
        label: "序号",
        tableColumnProps: {},
      },
      {
        type: "expand",
        label: "展开",
        tableColumnProps: {},
      },
      {
        type: "text",
        prop: "cnColor",
        label: "文本",
        tableColumnProps: {},
      },
      {
        type: "any-slot",
        label: "链接",
        slot: "expand",
        typeProps: {},
        tableColumnProps: {},
      },
      {
        type: "any-slot",
        label: "头像",
        slot: "avatar",
        typeProps: {},
        tableColumnProps: {},
      },
      {
        type: "any-slot",
        label: "图片",
        slot: "image",
        typeProps: {},
        tableColumnProps: {},
      },
    ];

    const buttons = [
      { command: "show", text: "查看", buttonProps: { plain: false } },
      { command: "edit", text: "编辑", buttonProps: { type: "primary" } },
      { command: "delete", text: "删除", buttonProps: { type: "danger" } },
    ];

    return {
      loading: false,
      columns,
      buttons,
    };
  },
  methods: {
    async getList(pageIndex, pageSize) {
      this.loading = true;

      const sleep = (delay = 3000) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, delay);
        });
      };
      await sleep(500);

      this.loading = false;

      const list = [];
      for (let i = 0; i < pageSize; i++) {
        list.push(
          JSON.parse(
            JSON.stringify({
              color: "red",
              cnColor: "红色",
              url: "https://map.tiiit.cn/deer.png",
              avatar: "https://map.tiiit.cn/deer.png",
            })
          )
        );
      }
      return [
        null,
        // { message: "获取列表失败" },
        {
          pageIndex,
          pageSize,
          totalSize: 28565,
          list,
        },
      ];
    },
    clickButton(command, row, index) {
      console.log(command, row, index);
      this.$refs.vafprotable.getElTableInstance().clearSelection();

      if (command === "edit") {
        this.$message.success("编辑成功");
      } else if (command === "delete") {
        this.$message.success("删除成功");
      }
    },
  },
};
</script>
```
