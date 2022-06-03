<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <h1>Home</h1>
          <div class="big"></div>
          <div class="auto"></div>
        </el-col>
        <el-col :span="18">
          <template v-for="item in 100" :key="item">
            <p>{{item}} hello Home! hello Home! ello Home! hello Home!</p>
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
.big {
  // width: 1000px;
  height: 20px;
  background: red;
}
.auto {
  width: 100%;
  height: 20px;
  background: green;
}
</style>