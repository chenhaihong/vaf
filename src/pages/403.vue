<template>
  <el-main>
    <el-row>
      <el-col :col="24">
        <el-result icon="error" title="403" sub-title="Access denied">
          <template #extra>
            <div class="extra--vaf">
              <span>{{ timeout }}秒后自动返回首页，</span>
              <el-button type="primary" @click="$router.replace('/')"
                >立即返回</el-button
              >
            </div>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  data: () => ({
    timeout: 10,
    id: null,
  }),
  mounted() {
    this.id = setInterval(() => {
      this.timeout--;
      if (this.timeout <= 0) {
        this.id && clearInterval(this.id);
        this.$router.replace("/");
      }
    }, 1000);
  },
  unmounted() {
    this.id && clearInterval(this.id);
  },
};
</script>

<style lang="scss">
.extra--vaf {
  display: flex;
  align-items: center;
  font-size: var(--el-font-size-small);
  color: var(--el-text-color-regular);
}
</style>
