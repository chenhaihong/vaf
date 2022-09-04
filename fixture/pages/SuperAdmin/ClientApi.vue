<template>
  <el-container>
    <el-main>
      <h1>client api</h1>
      <pre>
        <code class="javascript" v-hljs>{{usage}}</code>
      </pre>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "DocSvg",
  data() {
    return {
      usage: ` 
// 创建一个新的客户端
// 创建一个新的客户端
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
.pre {
  font-size: 16px;
}
</style>
