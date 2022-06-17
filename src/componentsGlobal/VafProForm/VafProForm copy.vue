<script setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script>
/**
 * VafProForm -- 配置式的表单组件
 * <vaf-pro-form :source="getList" :fields="fields" />
 */

import { ElMessage } from "element-plus";

export default {
  name: "VafProForm",
  data() {
    return {
      model: {},
    };
  },
  props: {
    // 表单props
    // field类型有: input, select, switch, radio, checkbox
    fields: { type: Array, default: () => [] },
  },
  created() {
    const model = {};
    this.fields.forEach((field) => {
      model[field.name] = field.value;
    });
    this.model = model;
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid, fields) => {
        // console.log(JSON.stringify(this.model, null, 2));
        if (valid) {
          console.log("submit!");
          this.$emit("submit", this.model);
        } else {
          console.log("error submit!", fields);
          Object.values(fields).forEach((field, index) => {
            // 处理消息框重叠的问题
            setTimeout(() => {
              ElMessage.error(field[0].message);
            }, 20 * index);
          });
        }
      });
    },
    reset() {
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<template>
  <el-form ref="form" :model="model" :inline="false">
    <el-form-item
      v-for="item in fields"
      :key="item.name"
      :label="item.label"
      :prop="item.name"
      :rules="item.rules"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="model[item.name]"
        clearable
        :placeholder="item.placeholder"
      ></el-input>
      <el-select
        v-else-if="item.type === 'select'"
        v-model="model[item.name]"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="itemSelect in item.options"
          :key="itemSelect.value"
          :label="itemSelect.label"
          :value="itemSelect.value"
        />
      </el-select>
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="model[item.name]"
      />
      <el-radio-group
        v-else-if="item.type === 'radio'"
        v-model="model[item.name]"
      >
        <el-radio
          v-for="itemRadio in item.options"
          :key="itemRadio.value"
          :label="itemRadio.value"
          >{{ itemRadio.label }}</el-radio
        >
      </el-radio-group>
      <el-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model="model[item.name]"
      >
        <el-checkbox
          v-for="itemCheckbox in item.options"
          :key="itemCheckbox.value"
          :label="itemCheckbox.value"
          name="type"
          >{{ itemCheckbox.label }}</el-checkbox
        >
      </el-checkbox-group>
      <el-input
        v-if="item.type === 'textarea'"
        v-model="model[item.name]"
        clearable
        :placeholder="item.placeholder"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="submit">
        查询
      </el-button>
      <el-button type="default" :icon="Brush" @click="reset"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss"></style>
