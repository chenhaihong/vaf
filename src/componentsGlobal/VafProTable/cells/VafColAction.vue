<template>
  <el-table-column label="操作" align="left">
    <template #default="scope">
      <div class="vaf-pro-table__button-group">
        <el-button-group>
          <el-button
            v-for="item in operations"
            :key="item.type"
            :type="item.type"
            @click="click(item.action, scope.row, scope.$index)"
          >
            {{ item.name }}
          </el-button>
        </el-button-group>
      </div>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "VafColAction",
  props: {
    operations: { type: Array, default: () => [] },
  },
  methods: {
    click(action, row, index) {
      this.$emit("clickButton", action, row, index);
    },
  },
};
</script>

<style lang="scss">
.vaf-pro-table__button-group {
  .el-button-group {
    display: flex;
  }
  .el-button {
    flex: 1 1 100%;
  }
}
</style>
