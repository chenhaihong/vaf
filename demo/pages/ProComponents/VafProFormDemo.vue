<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="margin-bottom: 20px; text-align: center">vaf-pro-form</h1>
          <el-button-group>
            <el-button type="primary" @click="gotoProForm(1)">
              ProForm query.id=1
            </el-button>
            <el-button type="success" @click="gotoProForm(2)">
              ProForm query.id=2
            </el-button>
          </el-button-group>
          <el-divider />
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">1. 高频表单组件</h2>
          <el-button
            @click="() => $refs.form1.clearValidate(['prop_textarea'])"
          >
            清除多行文本输入框的验证
          </el-button>
          <el-button @click="logFormData"> 打印表单数据 </el-button>
          <el-button @click="logFormInstance">
            打印表单实例查看expose
          </el-button>
          <el-divider />
          <vaf-pro-form
            ref="form1"
            :fields="fields1"
            :hide-submit="false"
            :hide-reset="false"
            @submit="submit"
            :formProps="{ inline: false, 'label-width': 180 }"
          />
        </el-col>
        <el-col :span="24">
          <h2 id="h22" style="margin-bottom: 20px">2. 低频表单组件</h2>
          <vaf-pro-form
            :fields="fields2"
            hide-reset
            @submit="submit"
            :formProps="{ inline: false, 'label-width': 180 }"
          />
        </el-col>
        <el-col :span="24">
          <h2 style="margin-bottom: 20px">2. 任意插槽</h2>
          <vaf-pro-form
            :fields="fields3"
            hide-submit
            hide-reset
            @submit="submit"
            :formProps="{ inline: false, 'label-width': 180 }"
          >
            <template #avatar="{ prop, model }">
              <el-avatar shape="square" :size="50" :src="model[prop]" />
              <el-input v-model="model[prop]" placeholder="请输入头像地址" />
            </template>
          </vaf-pro-form>
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
  name: "VafProFormDemo",
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
        prop: "prop_color-picker",
        defaultValue: "#ff00ff",
        label: "颜色选择器",
        rules: [],
        typeProps: {},
        formItemProps: {},
      },
      {
        type: "date-picker",
        prop: "prop_date-picker",
        label: "日期选择器",
        defaultValue: 1655654400000,
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
      {
        type: "datetime-picker",
        prop: "prop_datetime-picker",
        label: "日期时间选择器",
        defaultValue: 1655686800000,
        rules: [
          {
            required: true,
            message: "请选择日期时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
      {
        type: "input-number",
        prop: "prop_input-number",
        defaultValue: 0,
        label: "数字输入框",
        rules: [
          {
            required: true,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
      },
      {
        type: "rate",
        prop: "prop_rate",
        defaultValue: 8.5,
        label: "评分",
        rules: [
          {
            required: true,
            message: "请输入评分",
            trigger: "blur",
          },
        ],
        typeProps: {
          allowHalf: true,
          max: 10,
          size: "large",
          showScore: true,
        },
        formItemProps: {
          size: "large",
        },
      },
      {
        type: "slider",
        prop: "prop_slider",
        defaultValue: 80,
        label: "滑块",
        rules: [
          {
            required: true,
            message: "请拖动滑块",
            trigger: "blur",
          },
        ],
        typeProps: {
          height: "100px",
          min: 60,
          max: 100,
          vertical: true,
          showInput: true,
        },
        formItemProps: {},
      },
      {
        type: "time-picker",
        prop: "prop_time-picker_1",
        label: "时间选择器_默认",
        defaultValue: 1655686800000,
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          valueFormat: "x",
        },
      },
      {
        type: "time-picker",
        prop: "prop_time-picker_2",
        label: "时间选择器_自定义",
        defaultValue: [1655686800000, 1655697600000],
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          isRange: true,
          valueFormat: "x",
        },
      },
      {
        type: "time-select",
        prop: "prop_time-select",
        label: "时间下拉选择器",
        defaultValue: "2022-06-20 18:00:00 +08:00Z",
        rules: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        typeProps: {
          format: "YYYY-MM-DD HH:mm:ss Z[Z]",
        },
      },
      {
        type: "upload",
        prop: "prop_upload",
        label: "上传",
        defaultValue: [
          {
            name: "deer.png",
            url: "https://map.tiiit.cn/deer.png",
          },
        ],
        rules: [
          {
            required: false,
            message: "请上传图片",
            trigger: "blur",
          },
        ],
        typeProps: {
          action: "/vaf/upload",
          listType: "text",
          listType: "picture",
          listType: "picture-card",
        },
      },
    ];

    const fields3 = [
      {
        type: "any-slot",
        slot: "avatar",
        prop: "prop_any-slot_avatar",
        label: "任意插槽-头像",
        defaultValue: "https://map.tiiit.cn/deer.png",
      },
    ];

    return {
      fields1, // 高频表单组件
      fields2, // 低频表单组件
      fields3, // 任意插槽组件
    };
  },
  methods: {
    gotoProForm(id) {
      this.$router.push({
        path: "/pro-components/vaf-pro-form",
        query: {
          id: id,
        },
      });
    },
    logFormData() {
      console.log(JSON.stringify(this.$refs.form1?.getFormData(), null, 2));
    },
    logFormInstance() {
      console.log(this.$refs.form1);
    },
    submit(data) {
      console.log(JSON.stringify(data, null, 2));
    },
  },
  // created() {
  //   console.log("vaf-pro-form created");
  // },
  // activated() {
  //   console.log("vaf-pro-form activated");
  // },
  // deactivated() {
  //   console.log("vaf-pro-form deactivated");
  // },
  // unmounted() {
  //   console.log("vaf-pro-form unmounted");
  // },
};
</script>

<style></style>
