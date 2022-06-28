<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px; text-align: center">vaf-pro-table</h1>
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">1. 表格</h2>
          <el-button @click="logExpose">打印expose</el-button>
          <el-button @click="logRow0">打印第1行数据</el-button>
          <el-button @click="updateRow0"> 更新第1行数据</el-button>
          <el-button @click="logList">打印整个表格数据</el-button>
          <el-button @click="updateList">更新整个表格数据</el-button>
          <el-button @click="logPagination">打印分页</el-button>
          <el-button @click="updatePageIndex">更新pageIndex</el-button>
          <el-button @click="updatePageSize">更新pageSize</el-button>
          <el-divider />
          <vaf-pro-table
            v-loading="loading"
            ref="vafprotable"
            :dataFunc="getList"
            :columns="columns"
            :buttons="buttons"
            @button-click="clickButton"
            :defaultData="[]"
            :defaultPagination="{ pageIndex: 2, pageSize: 10, totalSize: 0 }"
            :tableProps="{ border: true, stripe: true }"
            :paginationProps="{
              background: false,
              layout: 'total, sizes, prev, pager, next, jumper',
            }"
            :buttonsColumnProps="{ width: '160px' }"
            :stopCreatedQuery="false"
          >
            <template #expand="scope">
              这是第 {{ scope.$index + 1 }} 个 expand 插槽
            </template>
            <template #avatar="scope">
              <el-avatar :src="scope.row.avatar" />
            </template>
          </vaf-pro-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
        label: "头像 any-slot",
        slot: "avatar",
        typeProps: {},
        tableColumnProps: {},
      },
      {
        type: "any-slot",
        label: "图片 any-slot",
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
    logExpose() {
      console.log(this.$refs.vafprotable);
    },
    logRow0() {
      console.log(this.$refs.vafprotable.getRow(0));
    },
    updateRow0() {
      const row = this.$refs.vafprotable?.getRow(0) || {};
      this.$refs.vafprotable?.updateRow(0, {
        ...row,
        color: "blue",
        cnColor: "蓝色",
      });
    },
    logList() {
      console.log(this.$refs.vafprotable.getList());
    },
    updateList() {
      const list = this.$refs.vafprotable?.getList() || [];
      this.$refs.vafprotable?.updateList(
        list.map((item) => {
          return {
            ...item,
            color: "blue",
            cnColor: "蓝色",
          };
        })
      );
    },
    logPagination() {
      console.log(this.$refs.vafprotable.getPagination());
    },
    updatePageIndex() {
      const pageIndex = this.$refs.vafprotable?.getPagination().pageIndex + 1;
      this.$refs.vafprotable?.updatePageIndex(pageIndex);
    },
    updatePageSize() {
      const pageSize = this.$refs.vafprotable?.getPagination().pageSize + 1;
      this.$refs.vafprotable?.updatePageSize(pageSize);
    },
  },
};
</script>

<style lang="scss"></style>
