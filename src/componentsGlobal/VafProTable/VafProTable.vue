<script setup>
import { Search, Brush } from "@element-plus/icons-vue";
</script>

<script>
/**
 * VafTable -- 配置式的重组件
 * <vaf-table :source="getList" :columns="cols" :operations="oprts" />
 */

export default {
  name: "VafProTable",
  props: {
    // 表单props
    // field类型有: input, select, switch, radio, checkbox
    fields: { type: Array, default: () => [] },
    // 表格props
    // index
    // checkbox
    cols: { type: Array, default: () => [] },
    operations: { type: Array, default: () => [] },
    // 分页props
  },
  computed: {
    // 表单computed
    model() {
      const model = {};
      this.fields.forEach((field) => {
        model[field.name] = field.value;
      });
      return model;
    },
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid, fields) => {
        console.log(JSON.stringify(this.model, null, 2));

        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    clear() {
      // TODO 重置表单
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
        v-model="item.value"
        clearable
        :placeholder="item.placeholder"
      ></el-input>
      <el-select
        v-else-if="item.type === 'select'"
        v-model="item.value"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="itemSelect in item.options"
          :key="itemSelect.value"
          :label="itemSelect.label"
          :value="itemSelect.value"
        />
      </el-select>
      <el-switch v-else-if="item.type === 'switch'" v-model="item.value" />
      <el-radio-group v-else-if="item.type === 'radio'" v-model="item.value">
        <el-radio
          v-for="itemRadio in item.options"
          :key="itemRadio.value"
          :label="itemRadio.value"
          >{{ itemRadio.label }}</el-radio
        >
      </el-radio-group>
      <el-checkbox-group
        v-else-if="item.type === 'checkbox'"
        v-model="item.value"
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
        v-model="item.value"
        clearable
        :placeholder="item.placeholder"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="submit">
        查询
      </el-button>
      <el-button type="default" :icon="Brush" @click="clear"> 清空 </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss"></style>
