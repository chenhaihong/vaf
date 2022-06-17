<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px">vaf-table使用示例</h1>
        </el-col>
        <el-col :span="24">
          <vaf-pro-form :fields="fields" :inline="false" :label-width="120" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          type: "color-picker",
          prop: "color",
          value: "#ff0000",
          label: "颜色",
          rules: [],
          typeProps: {},
          formItemProps: {},
        },
        {
          type: "input",
          prop: "email",
          value: "",
          label: "邮箱",
          rules: [
            {
              required: true,
              message: "请输入邮箱",
              trigger: "blur",
            },
            {
              type: "email",
              message: "请输入正确的邮箱",
              trigger: "blur",
            },
          ],
        },
        {
          type: "switch",
          prop: "enabled",
          label: "是否启用",
          value: true,
          rules: [
            {
              required: true,
              message: "请选择是否启用",
              trigger: "blur",
            },
          ],
        },
        {
          type: "switch",
          label: "已经派送",
          prop: "delivered",
          value: 1,
          typeProps: {
            activeValue: 1,
            inactiveValue: 2,
            activeText: "是",
            inactiveText: "否",
          },
        },
        {
          type: "select",
          prop: "zone",
          value: "",
          label: "区域",
          options: [
            { label: "Zone one", value: "shanghai" },
            { label: "Zone two", value: "beijing" },
          ],
          rules: [
            {
              required: true,
              message: "请选择区域",
              trigger: "blur",
            },
          ],
        },
        {
          type: "radio",
          label: "性别",
          name: "sex",
          value: "male",
          options: [
            { label: "男", value: "male" },
            { label: "女", value: "female" },
            { label: "其他", value: "other" },
          ],
          rules: [
            {
              required: true,
              message: "请选择性别",
              trigger: "blur",
            },
          ],
        },
        {
          type: "checkbox",
          label: "活动类型",
          name: "activity",
          value: ["online"],
          options: [
            { label: "线上", value: "online" },
            { label: "线下", value: "offline" },
          ],
          rules: [
            {
              required: true,
              message: "请选择活动类型",
              trigger: "blur",
            },
          ],
        },
        {
          type: "textarea",
          label: "活动描述",
          name: "description",
          value: "",
          rules: [
            {
              required: true,
              message: "请输入活动描述",
              trigger: "blur",
            },
          ],
        },
        {
          type: "date",
          label: "日期",
          name: "date",
          value: "",
          rules: [
            {
              required: true,
              message: "请选择日期",
              trigger: "blur",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
