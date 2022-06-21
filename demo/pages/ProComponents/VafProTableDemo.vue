<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px; text-align: center">vaf-pro-table</h1>
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">1. 基础使用</h2>
          <vaf-pro-table
            ref="table"
            :dataFunc="getList"
            :columns="columns"
            :operations="operations"
            @action="action"
            border
            stripe
          />
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
        label: "English Color",
        tableColumnProps: {},
      },
      {
        type: "index",
        label: "序号",
        tableColumnProps: {},
      },
      {
        prop: "cnColor",
        label: "中文颜色",
        tableColumnProps: {},
      },
    ];

    const operations = [
      { type: "primary", action: "edit", name: "编辑" },
      { type: "danger", action: "delete", name: "删除" },
    ];

    return {
      columns,
      operations,
    };
  },
  methods: {
    async getList() {
      const sleep = (delay = 3000) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, delay);
        });
      };
      await sleep(500);
      return [
        null,
        // { message: "获取列表失败" },
        {
          pageIndex: 1,
          pageSize: 10,
          totalSize: 28565,
          list: [
            {
              color: "red",
              cnColor: "红色",
            },
            {
              color: "blue",
              cnColor: "蓝色",
            },
            {
              color: "green",
              cnColor: "绿色",
            },
          ],
        },
      ];
    },
    action(type, row, index) {
      console.log(type, row, index);
      this.$refs.table.getElTableInstance().clearSelection();

      if (type === "edit") {
        this.$message.success("编辑成功");
      } else if (type === "delete") {
        this.$message.success("删除成功");
      }
    },
  },
};
</script>

<style lang="scss"></style>
