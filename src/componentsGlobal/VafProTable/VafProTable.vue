<script lang="jsx">
/**
 * VafProTable -- 配置式的表格重组件
 * <vaf-pro-table :dataFunc="getList" :columns="cols" :operations="oprts" :pagination="pagination" />
 */

import { ElMessage } from "element-plus";

import VafColAction from "./cells/VafColAction.vue";
import VafColumns from "./cells/VafColumns.vue";

const defaultPageIndex = 1;
const defaultPageSize = 10;

export default {
  name: "VafProTable",
  inheritAttrs: false,
  components: {
    VafColAction,
    VafColumns,
  },
  props: {
    // 异步函数，用于获取表格数据
    dataFunc: { type: Function, default: () => [] },
    // 表格的列, 类型包含: index, checkbox, text, image,
    columns: { type: Array, default: () => [] },
    // 表格的操作列, 类型用户自定义
    operations: { type: Array, default: () => [] },
    // 表格的默认分页数据
    defaultPagination: {
      type: Object,
      default: () => ({
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
        totalSize: 0,
      }),
    },
  },
  data() {
    return {
      // 表格的数据
      data: [],
      pagination: {
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
        totalSize: 0,
      },
    };
  },
  computed: {},
  methods: {
    getElTableInstance() {
      return this.$refs.elTable;
    },
    async resolveData(pageIndex, pageSize) {
      const [err, data] = await this.dataFunc(pageIndex, pageSize);
      if (err) {
        return ElMessage.error(err.message || "请求数据失败，请重试");
      } else {
        const { list, pageIndex, pageSize, totalSize } = data;
        this.data = list;
      }
    },
    clickButton(action, row, index) {
      this.$emit("action", action, row, index);
    },
  },
  created() {
    // 设置默认分页数据
    this.pagination = {
      ...this.defaultPagination,
      ...this.pagination,
    };

    // 首次请求数据
    const pageIndex = this.pagination.pageIndex;
    const pageSize = this.pagination.pageSize;
    this.resolveData(pageIndex, pageSize);
  },

  render() {
    return (
      <el-table ref="elTable" data={this.data} {...this.$attrs}>
        <VafColumns
          pageIndex={this.pagination.pageIndex}
          pageSize={this.pagination.pageSize}
          columns={this.columns}
        />
        operations.length > 0 && (
        <VafColAction
          operations={this.operations}
          onClickButton={this.clickButton}
        />
        )
      </el-table>
    );
  },
};
</script>

<style lang="scss"></style>
