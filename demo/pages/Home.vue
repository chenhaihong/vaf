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
        <el-col :span="18">
          <h1>Hello Home</h1>
          <template v-for="item in 100" :key="item">
            <p>{{ item }} hello Home!</p>
          </template>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {};
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
