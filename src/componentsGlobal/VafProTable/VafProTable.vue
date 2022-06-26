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
  emits: ["clickButton", "update:data", "update:pagination"],
  props: {
    // 表格的列表数据
    data: { type: Array, default: () => [] },
    // 异步函数，用于获取表格数据
    dataFunc: { type: Function, default: () => [] },
    // 表格的列, 类型包含: index, checkbox, text, image,
    columns: { type: Array, default: () => [] },
    // 表格的按钮列, 类型用户自定义
    buttons: { type: Array, default: () => [] },
    // 表格的按钮列的属性, 与element-plus的el-table-column属性保持一直, 参考https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
    buttonsColumnProps: { type: Object, default: () => {} },
    // 表格的分页数据
    pagination: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      }),
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
      // list: [],
      // pagenation: {},
    };
  },
  watch: {
    "pagination.pageIndex": {
      immediate: false,
      handler(next, prev) {
        if (!this.stopAutoQuery && next !== prev) {
          this.execDataFunc(next, this.pagination.pageSize);
        }
      },
    },
    "pagination.pageSize": {
      immediate: false,
      handler(next, prev) {
        if (!this.stopAutoQuery && next !== prev) {
          this.execDataFunc(this.pagination.pageIndex, next);
        }
      },
    },
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
        this.$emit("update:pagination", { pageIndex, pageSize, totalSize });
        this.$emit("update:data", list);
      }
      return [err, data];
    },
    clickButton(command, row, index) {
      this.$emit("clickButton", command, row, index);
    },
    handlePageIndexChange(val) {
      this.$emit("update:pagination", { ...this.pagination, pageIndex: val });
    },
    handlePageSizeChange(val) {
      this.$emit("update:pagination", {
        ...this.pagination,
        pageIndex: 1, // 分页大小改变时, 重置pageIndex为1, 避免出现分页数大于总数时, 无数据展示的问题
        pageSize: val,
      });
    },
  },
  created() {
    !this.stopCreatedQuery && this.execDataFunc(); // 首次请求数据
  },

  render() {
    return (
      <div className="vaf-pro-table">
        <div className="vaf-pro-table__table">
          <el-table ref="elTable" data={this.data} {...this.tableProps}>
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
