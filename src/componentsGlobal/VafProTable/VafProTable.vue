<script lang="jsx">
/**
 * VafProTable -- 配置式的表格重组件
 * <vaf-pro-table :dataFunc="getList" :columns="cols" :buttons="oprts" :pagination="pagination" />
 */

import { ElMessage } from "element-plus";

import VafColumnButtons from "./cells/VafColumnButtons.vue";
import VafColumns from "./cells/VafColumns.vue";

export default {
  name: "VafProTable",
  inheritAttrs: false,
  components: {
    VafColumnButtons,
    VafColumns,
  },
  emits: ["button-click", "page-index-change", "page-size-change"],
  props: {
    // 异步函数，用于获取表格数据
    dataFunc: { type: Function, default: () => [] },
    // 表格的列, 类型包含: index, checkbox, text, image,
    columns: { type: Array, default: () => [] },
    // 表格的按钮列, 类型用户自定义
    buttons: { type: Array, default: () => [] },
    // 表格的按钮列的属性, 与element-plus的el-table-column属性保持一直, 参考https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
    buttonsColumnProps: { type: Object, default: () => {} },
    // 表格的默认列表数据
    defaultData: { type: Array, default: () => [] },
    // 表格的默认分页数据
    defaultPagination: {
      type: Object,
      default: () => ({ pageIndex: 1, pageSize: 10, totalSize: 0 }),
    },
    // pageIndex, pageSize 变化时, 自动执行dataFunc函数
    stopAutoQuery: { type: Boolean, default: false },
    // 创建实例时, 阻止执行dataFunc方法
    stopCreatedQuery: { type: Boolean, default: false },
    // 表格的默认属性,  与element-plus的el-table属性保持一直, 参考 https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
    tableProps: { type: Object, default: () => ({}) },
    // 分页器的默认属性, 与element-plus的el-pagination属性保持一直, 参考 https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7
    paginationProps: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      list: [],
      pagination: { pageIndex: 1, pageSize: 10, totalSize: 0 },
    };
  },
  methods: {
    getElTableInstance() {
      return this.$refs.elTable;
    },
    async execDataFunc(pageIndex = void 0, pageSize = void 0) {
      const nextPageIndex = pageIndex || this.pagination.pageIndex || 1;
      const nextPageSize = pageSize || this.pagination.pageSize || 10;
      const [err, data] = await this.dataFunc(nextPageIndex, nextPageSize);
      if (err) {
        ElMessage.error(err.message || "请求数据失败，请重试");
      } else {
        const { list = [], pageIndex = 1, pageSize = 10, totalSize = 0 } = data;
        this.pagination = { pageIndex, pageSize, totalSize };
        this.list = list;
      }
      return [err, data];
    },
    updatePageIndex(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      !this.stopAutoQuery && this.execDataFunc();
    },
    updatePageSize(pageSize) {
      this.pagination.pageSize = pageSize;
      !this.stopAutoQuery && this.execDataFunc();
    },
    clickButton(command, row, index) {
      this.$emit("button-click", command, row, index);
    },
    handlePageIndexChange(val) {
      this.pagination.pageIndex = val;
      this.$emit("page-index-change", val);
      !this.stopAutoQuery && this.execDataFunc();
    },
    handlePageSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit("page-size-change", val);
      !this.stopAutoQuery && this.execDataFunc();
    },
  },
  created() {
    // 默认数据
    this.list = [...this.defaultData];
    this.pagination = { ...this.pagination, ...this.defaultPagination };

    // 首次请求数据
    !this.stopCreatedQuery && this.execDataFunc();
  },

  render() {
    return (
      <div className="vaf-pro-table">
        <div className="vaf-pro-table__table">
          <el-table ref="elTable" data={this.list} {...this.tableProps}>
            <VafColumns
              pageIndex={this.pagination.pageIndex}
              pageSize={this.pagination.pageSize}
              columns={this.columns}
            >
              {{ ...this.$slots }}
            </VafColumns>
            {this.buttons.length > 0 && (
              <VafColumnButtons
                buttons={this.buttons}
                onClickButton={this.clickButton}
                {...this.buttonsColumnProps}
              />
            )}
          </el-table>
        </div>
        <div className="vaf-pro-table__pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            total={this.pagination.totalSize}
            pageSizes={[10, 20, 30, 40, 50, 100]}
            current-page={this.pagination.pageIndex}
            page-size={this.pagination.pageSize}
            onCurrentChange={this.handlePageIndexChange}
            onSizeChange={this.handlePageSizeChange}
            {...this.paginationProps}
          ></el-pagination>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss">
@include b(pro-table) {
  @include e(pagination) {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
