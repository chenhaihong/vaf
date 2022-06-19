<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px">vaf-pro-form 使用示例</h1>
        </el-col>
        <el-col :span="24">
          <vaf-pro-form
            :fields="fields"
            :inline="false"
            :label-width="140"
            @submit="submit"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
const cascaderOptions = [
  {
    value: "lv1",
    label: "Lv1",
    children: [
      {
        value: "lv1-1",
        label: "Lv1-1",
        children: [
          { value: "lv1-1-1", label: "Lv1-1-1" },
          { value: "lv1-1-2", label: "Lv1-1-2" },
        ],
      },
      {
        value: "lv1-2",
        label: "Lv1-2",
        children: [
          { value: "lv1-2-1", label: "Lv1-2-1" },
          { value: "lv1-2-2", label: "Lv1-2-2" },
        ],
      },
    ],
  },
  {
    value: "lv2",
    label: "Lv2",
    children: [
      {
        value: "lv2-1",
        label: "Lv2-1",
        children: [
          { value: "lv2-1-1", label: "Lv2-1-1" },
          { value: "lv2-1-2", label: "Lv2-1-2" },
        ],
      },
    ],
  },
];

export default {
  data() {
    // 高频表单组件
    const fields1 = [
      {
        type: "cascader",
        prop: "prop_cascader",
        label: "级联选择器",
        defaultValue: ["lv1", "lv1-1", "lv1-1-1"],
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        typeProps: {
          options: cascaderOptions,
        },
      },
      {
        type: "checkbox",
        prop: "prop_checkbox",
        defaultValue: true,
        label: "多选框",
        rules: [
          {
            required: true,
            message: "请选择其是否自动开启",
            trigger: "blur",
          },
        ],
      },
      {
        type: "checkbox-group",
        prop: "prop_checkbox-group",
        defaultValue: [1],
        label: "多选框组",
        options: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
        ],
        rules: [
          {
            required: true,
            message: "请选择多选框",
            trigger: "blur",
          },
        ],
      },
      {
        type: "input",
        prop: "prop_input",
        defaultValue: "单行文本输入框",
        label: "单行文本输入框",
        rules: [
          {
            required: true,
            message: "请输入文本",
            trigger: "blur",
          },
        ],
      },
      {
        type: "input-number",
        prop: "prop_input-number",
        defaultValue: 0,
        label: "数字输入框",
        rules: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
      },
      {
        type: "radio-group",
        prop: "prop_radio-group",
        defaultValue: "male",
        label: "单选框组",
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
        type: "select",
        prop: "prop_select",
        defaultValue: "2",
        label: "选择器",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
        rules: [
          {
            required: true,
            message: "请选择选项",
            trigger: "blur",
          },
        ],
      },
      {
        type: "switch",
        prop: "prop_switch_1",
        defaultValue: true,
        label: "开关-默认",
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
        prop: "prop_switch_2",
        defaultValue: 1,
        label: "开关-自定义",
        typeProps: {
          activeValue: 1,
          inactiveValue: 2,
          activeText: "是",
          inactiveText: "否",
        },
      },
      {
        type: "textarea",
        prop: "prop_textarea",
        defaultValue: "多行文本输入框",
        label: "多行文本输入框",
        rules: [
          {
            required: true,
            message: "请输入活动描述",
            trigger: "blur",
          },
        ],
      },
    ];

    // 低频表单组件
    const fields2 = [
      {
        type: "color-picker",
        prop: "color",
        defaultValue: "#ff00ff",
        label: "颜色",
        rules: [],
        typeProps: {},
        formItemProps: {},
      },
      {
        type: "date",
        prop: "date",
        label: "日期",
        defaultValue: "",
        rules: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
    ];

    return {
      fields: [
        ...fields1, // 高频表单组件
        // ...fields2, // 低频表单组件
      ],
    };
  },
  methods: {
    submit(data) {
      console.log(JSON.stringify(data, null, 2));
    },
  },
};
</script>

<style></style>
