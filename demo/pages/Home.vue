<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <h1>Home</h1>
          <div class="red"></div>
          <div class="green"></div>
          <div class="blue"></div>
        </el-col>
        <el-col :span="6">
          <h1>Hello ProComponent</h1>
          <el-button type="primary" @click="gotoProForm()">
            ProForm query.id=null
          </el-button>
        </el-col>
        <el-col :span="6">
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
