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
  props: {
    // 异步函数，用于获取表格数据
    dataFunc: { type: Function, default: () => [] },
    // 表格的列, 类型包含: index, checkbox, text, image,
    columns: { type: Array, default: () => [] },
    // 表格的按钮列, 类型用户自定义
    buttons: { type: Array, default: () => [] },
    // 表格的按钮列的属性, 与element-plus的el-table-column属性保持一直, 参考https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
    buttonsColumnProps: { type: Object, default: () => {} },
    // 表格的默认分页数据
    defaultPagination: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      }),
    },
    // 表格的默认属性,  与element-plus的el-table属性保持一直, 参考 https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
    tableProps: { type: Object, default: () => ({}) },
    // 分页器的默认属性, 与element-plus的el-pagination属性保持一直, 参考 https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7
    paginationProps: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      // 表格的数据
      data: [],
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
      },
    };
  },
  computed: {},
  methods: {
    getElTableInstance() {
      return this.$refs.elTable;
    },
    async resolveData(nextPageIndex, nextPageSize) {
      const [err, data] = await this.dataFunc(nextPageIndex, nextPageSize);
      if (err) {
        return ElMessage.error(err.message || "请求数据失败，请重试");
      } else {
        const { list, pageIndex = 1, pageSize = 10, totalSize = 0 } = data;
        this.pagination.pageIndex = pageIndex;
        this.pagination.pageSize = pageSize;
        this.pagination.totalSize = totalSize;
        this.data = list;
      }
    },
    clickButton(command, row, index) {
      this.$emit("clickButton", command, row, index);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.resolveData(1, val);
    },
    handleCurrentChange(val) {
      this.pagination.pageIndex = val;
      this.resolveData(val, this.pagination.pageSize);
    },
  },
  created() {
    // 设置默认分页数据
    this.pagination = {
      ...this.pagination,
      ...this.defaultPagination,
    };

    // 首次请求数据
    const pageIndex = this.pagination.pageIndex;
    const pageSize = this.pagination.pageSize;
    this.resolveData(pageIndex, pageSize);
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
            />
            buttons.length > 0 && (
            <VafColumnButtons
              buttons={this.buttons}
              onClickButton={this.clickButton}
              {...this.buttonsColumnProps}
            />
            )
          </el-table>
        </div>
        <div className="vaf-pro-table__pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            total={this.pagination.totalSize}
            pageSizes={[10, 20, 30, 40, 50, 100]}
            current-page={this.pagination.pageIndex}
            page-size={this.pagination.pageSize}
            onCurrentChange={this.handleCurrentChange}
            onSizeChange={this.handleSizeChange}
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
