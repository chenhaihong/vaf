<script lang="jsx">
const renderDefaultExpandTip = () => {
  return (
    <el-alert
      title="请在重组件 vaf-pro-table 中定义expand插槽，如："
      type="warning"
      show-icon
      closable={false}
    >
      {`<template #expand="{ row, $index }"> 你的内容 </template>`}
    </el-alert>
  );
};

const renderDefaultAnySlotTip = (slotName) => () => {
  return (
    <el-alert
      title={`请在重组件 vaf-pro-table 中定义 ${slotName} 插槽，如：`}
      type="warning"
      show-icon
      closable={false}
    >
      {`<template #${slotName}="{ row, $index }"> 你的内容 </template>`}
    </el-alert>
  );
};

export default {
  name: "VafColumns",
  inheritAttrs: false,
  props: {
    pageIndex: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: () => [] },
  },
  methods: {
    renderTypeExpand(prop, label = "", tableColumnProps) {
      const slots = {
        default: this.$slots.expand || renderDefaultExpandTip,
      };
      return (
        <el-table-column type="expand" label={label} {...tableColumnProps}>
          {slots}
        </el-table-column>
      );
    },
    renderTypeIndex(prop, label, tableColumnProps) {
      const pageIndex = this.pageIndex;
      const pageSize = this.pageSize;

      // vue3 render+jsx 传递插槽
      // https://staging-cn.vuejs.org/guide/extras/render-function.html#passing-slots
      const slots = {
        default: ({ $index }) => {
          return <span>{(pageIndex - 1) * pageSize + $index + 1}</span>;
        },
      };
      return (
        <el-table-column label={label || "序号"} {...tableColumnProps}>
          {slots}
        </el-table-column>
      );
    },
    renderTypeSelection(prop, label, tableColumnProps) {
      return <el-table-column type="selection" {...tableColumnProps} />;
    },
    renderTypeText(prop, label, tableColumnProps) {
      return (
        <el-table-column
          prop={prop}
          label={label || prop}
          {...tableColumnProps}
        />
      );
    },
    renderTypeAnySlot(prop, label, tableColumnProps, slotName) {
      const slots = {
        default: this.$slots[slotName] || renderDefaultAnySlotTip(slotName),
      };
      return (
        <el-table-column label={label} {...tableColumnProps}>
          {slots}
        </el-table-column>
      );
    },
  },
  render() {
    const cols = this.columns.map((item) => {
      const {
        /**
         * 列的类型,
         *  (1)可以为内置支持的类型: expand(√), index(√), selection(√), text(√), ''(√)
         *  (2)可以为自定义类型: any-slot(√)
         *
         *  expand: 展开列,
         *  当使用 expand 这一类型时, 需要在插槽中定义插槽 expand, 参考 element-plus 文档,
         *  https://element-plus.org/zh-CN/component/table.html#%E5%B1%95%E5%BC%80%E8%A1%8C
         *
         *  any-slot: 任意slot列,
         *  当使用 any-slot 这一类型时, 需要在 columns 中定义 slot<string> 字段, 如:
         *  cloumn={ type: 'any-slot', slot: 'avatar', tableColumnProps: {} }
         *
         *  并在插槽中定义名称与这个字段相同的插槽, 如:
         *  <template #avatar="{ row, $index }">
         *    <el-avatar :src="row.avatar" />
         *  </template>
         */
        type = "",

        // 列的属性, 与列表的属性一致
        prop,

        // 列的标题, 如果没有设置, 则使用列的属性
        label,

        // 表格列的配置属性, 与列表的配置一致, 参考 https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
        tableColumnProps = {},
      } = item;

      switch (type) {
        /**
         * vaf-pro-table 的自定义类型
         */
        case "any-slot":
          return this.renderTypeAnySlot(prop, label, tableColumnProps, item.slot);

        /**
         * vaf-pro-table 的内置类型
         */
        case "expand":
          return this.renderTypeExpand(prop, label, tableColumnProps);
        case "index":
          return this.renderTypeIndex(prop, label, tableColumnProps);
        case "selection":
          return this.renderTypeSelection(prop, label, tableColumnProps);
        case "":
        case "text":
        default:
          return this.renderTypeText(prop, label, tableColumnProps);
      }
    });

    return cols;
  },
};
</script>

<style>
</style>
