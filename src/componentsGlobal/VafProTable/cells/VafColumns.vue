<script lang="jsx">
export default {
  name: "VafColumns",
  inheritAttrs: false,
  props: {
    pageIndex: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    columns: { type: Array, default: () => [] },
  },
  methods: {
    renderTypeAvatar(prop, label, tableColumnProps, typeProps) {
      const slots = {
        default: ({ row }) => {
          return (
            <el-avatar
              src={row[prop]}
              shape="square"
              size={50}
              alt={row[prop]}
              {...typeProps}
            ></el-avatar>
          );
        },
      };
      return (
        <el-table-column label={label || prop} {...tableColumnProps}>
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
        default: ({ row, $index }) => {
          return <span>{(pageIndex - 1) * pageSize + $index + 1}</span>;
        },
      };
      return (
        <el-table-column label="序号" {...tableColumnProps}>
          {slots}
        </el-table-column>
      );
    },
    renderTypeImage(prop, label, tableColumnProps, typeProps) {
      const slots = {
        default: ({ row }) => {
          return (
            <el-image
              style="width:80px; height:80px"
              src={row[prop]}
              preview-src-list={[row[prop]]}
              preview-teleported={true}
              fit="cover"
              alt={row[prop]}
              {...typeProps}
            />
          );
        },
      };
      return (
        <el-table-column label={label || prop} {...tableColumnProps}>
          {slots}
        </el-table-column>
      );
    },
    renderTypeLink(prop, label, tableColumnProps, typeProps) {
      const slots = {
        default: ({ row, $index }) => {
          return (
            <el-link target="blank" href={row[prop]} {...typeProps}>
              {row[prop]}
            </el-link>
          );
        },
      };
      return (
        <el-table-column label={label || prop} {...tableColumnProps}>
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
  },
  render() {
    const cols = this.columns.map((item, index) => {
      const pageIndex = this.pageIndex;
      const pageSize = this.pageSize;
      const {
        // 列的类型, 可以为 avatar(√), expand(TODO), index(√), image(√), link(√), selection(√), text(√), ''(√),
        type = "",

        // 列的属性, 与列表的属性一致
        prop,

        // 列的标题, 如果没有设置, 则使用列的属性
        label,

        // 当前使用类型的组件的属性, 与element-plus定义的约束一致, 参考element-plus的API
        typeProps = {},

        // 表格列的配置属性, 与列表的配置一致, 参考 https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
        tableColumnProps = {},
      } = item;

      switch (type) {
        case "avatar":
          return this.renderTypeAvatar(
            prop,
            label,
            tableColumnProps,
            typeProps
          );
        case "expand": // TODO 展开行
          return null;
        case "index":
          return this.renderTypeIndex(prop, label, tableColumnProps);
        case "image":
          return this.renderTypeImage(prop, label, tableColumnProps, typeProps);
        case "link":
          return this.renderTypeLink(prop, label, tableColumnProps, typeProps);
        case "selection":
          return this.renderTypeSelection(prop, label, tableColumnProps);
        case "text":
        default:
          return this.renderTypeText(prop, label, tableColumnProps);
      }
    });

    return cols;
  },
};
</script>

<style></style>
