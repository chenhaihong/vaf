<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8">
          <h1>Home</h1>
          <div class="red"></div>
          <div class="green"></div>
          <div class="blue"></div>
          <el-button text @click="dialogVisible = true">click to open the Dialog</el-button>
          <el-dialog v-model="dialogVisible" title="Tips" width="30%">
            <p>针对弹出框做了z-index层级优化，不用将弹出框append-to-body</p>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
              </span>
            </template>
          </el-dialog>
        </el-col>
        <el-col :span="8">
          <h1>Hello ProComponent</h1>
          <el-button type="primary" @click="gotoProForm()">
            ProForm query.id=null
          </el-button>
        </el-col>
        <el-col :span="8">
          <h1>Hello Scrollbar</h1>
          <template v-for="item in 100" :key="item">
            <p>{{ item }} 撑出滚动条!</p>
          </template>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    }
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
  },
};
</script>

<style lang="scss">
.red {
  height: 20px;
  background: red;
}

.green {
  height: 20px;
  background: green;
}

.blue {
  height: 20px;
  background: blue;
}
</style>
