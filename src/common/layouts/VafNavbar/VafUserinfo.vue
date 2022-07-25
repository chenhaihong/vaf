<template>
  <div class="vaf-userinfo">
    <el-popover
      title
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-avatar :size="40" :src="userinfo.avatar"></el-avatar>
      </template>
      <template #default>
        <div class="vaf-userinfo-popover">
          <div class="vaf-userinfo-popover__left">
            <el-avatar
              class="vaf-userinfo-popover__avatar"
              :size="60"
              shape="square"
              :src="userinfo.avatar"
            ></el-avatar>
          </div>
          <div class="vaf-userinfo-popover__right">
            <div class="vaf-userinfo-popover__nickname">
              {{ userinfo.nickname }}
            </div>
            <div v-if="roles.length" class="vaf-userinfo-popover__roles">
              <el-tag
                v-for="role in roles"
                :key="role"
                class="vaf-userinfo-popover__role"
                type="success"
                >{{ role }}</el-tag
              >
            </div>
          </div>
        </div>
      </template>
    </el-popover>
    <el-divider direction="vertical" />
    <el-button type="danger" size="small" round @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "VafUserinfo",
  computed: {
    userinfo() {
      return this.$store.state.VafAuth.userinfo;
    },
    roles() {
      return this.$store.state.VafAuth.roles;
    },
  },
  methods: {
    logout() {
      this.$confirm(
        "退出前，请确认您的操作已经执行完毕。",
        "您确定要退出吗？",
        {
          showClose: false,
          closeOnClickModal: false,

          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: async (action, instance, done) => {
            if (action === "confirm") {
              instance.showCancelButton = false;
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "正在退出...";

              const [err] = await this.$store.dispatch("VafAuth/logout");
              if (!err) {
                this.$router.push("/login");
              }
              done();
            } else {
              done();
            }
          },
        }
      ).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
@include b(userinfo) {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @include e(nickname) {
    margin-left: 10px;
    margin-right: 10px;
  }
}

@include b(userinfo-popover) {
  @include flex(row, nowrap, flex-start, stretch);

  @include e(right) {
    @include flex(column, nowrap, center, flex-start);

    margin-left: 10px;
    flex: 1;
  }

  @include e(nickname) {
    font-size: 18px;
    font-weight: bold;
  }

  @include e(roles) {
    margin-top: 6px;
  }
  @include e(role) {
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
</style>
