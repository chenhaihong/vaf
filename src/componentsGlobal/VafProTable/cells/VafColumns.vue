<script lang="jsx">
export default {
  name: "VafColumns",
  inheritAttrs: false,
  props: {
    pageIndex: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: () => [] },
  },

  render() {
    const pageIndex = this.pageIndex;
    const pageSize = this.pageSize;

    const cols = this.columns.map((item, index) => {
      const {
        // 列的类型, 可以为 avatar, expand, index, image, link, selection, text, '',
        type = "",

        // 列的属性, 与列表的属性一致
        prop,

        // 列的标题, 如果没有设置, 则使用列的属性
        label,

        // 表格列的属性, 参考 https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
        tableColumnProps = {},
      } = item;
      const colProps = {
        key: item.prop,
        ...tableColumnProps,
      };

      switch (type) {
        case "avatar": // TODO 图片头像
          return null;
        case "expand": // TODO 展开行
          return null;
        case "index":
          return (
            <el-table-column label="序号" {...colProps}>
              {pageSize * (pageIndex - 1) + index + 1}
            </el-table-column>
          );
        case "image": // TODO 图片
          return null;
        case "link": // TODO 链接
          return null;
        case "selection":
          return <el-table-column type="selection" />;
        case "text":
        default:
          return (
            <el-table-column prop={prop} label={label || prop} {...colProps} />
          );
      }
    });

    return cols;
  },
};
</script>

<style></style>
