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
            v-loading="loading"
            ref="table"
            :dataFunc="getList"
            :columns="columns"
            :buttons="buttons"
            :defaultPagination="{ pageIndex: 20, pageSize: 10, totalSize: 0 }"
            @clickButton="clickButton"
            :tableProps="{ border: true, stripe: true }"
            :paginationProps="{
              background: false,
              layout: 'total, sizes, prev, pager, next, jumper',
            }"
            :buttonsColumnProps="{ width: '160px' }"
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
        type: "text",
        prop: "cnColor",
        label: "文本",
        tableColumnProps: {},
      },
      {
        type: "link",
        prop: "url",
        label: "链接",
        typeProps: {},
        tableColumnProps: {},
      },
      {
        type: "avatar",
        prop: "avatar",
        label: "头像",
        typeProps: {},
        tableColumnProps: {},
      },
      {
        type: "image",
        prop: "avatar",
        label: "图片",
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
      return [
        null,
        // { message: "获取列表失败" },
        {
          pageIndex,
          pageSize,
          totalSize: 28565,
          list: new Array(pageSize).fill({
            color: "red",
            cnColor: "红色",
            url: "https://map.tiiit.cn/deer.png",
            avatar: "https://map.tiiit.cn/deer.png",
          }),
        },
      ];
    },
    clickButton(command, row, index) {
      console.log(command, row, index);
      this.$refs.table.getElTableInstance().clearSelection();

      if (command === "edit") {
        this.$message.success("编辑成功");
      } else if (command === "delete") {
        this.$message.success("删除成功");
      }
    },
  },
};
</script>

<style lang="scss"></style>
