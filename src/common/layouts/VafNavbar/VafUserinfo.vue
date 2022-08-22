<template>
  <div class="vaf-userinfo">
    <el-divider v-if="ifPrefixDivider" direction="vertical" />
    <el-popover title :width="200" trigger="hover" content="this is content, this is content, this is content">
      <template #reference>
        <el-avatar :size="40" :src="userinfo.avatar"></el-avatar>
      </template>
      <template #default>
        <div class="vaf-userinfo-popover">
          <div class="vaf-userinfo-popover__left">
            <el-avatar class="vaf-userinfo-popover__avatar" :size="60" shape="square" :src="userinfo.avatar">
            </el-avatar>
          </div>
          <div class="vaf-userinfo-popover__right">
            <div class="vaf-userinfo-popover__nickname">
              {{ userinfo.nickname }}
            </div>
            <div v-if="roles.length" class="vaf-userinfo-popover__roles">
              <el-tag v-for="role in roles" :key="role" class="vaf-userinfo-popover__role" type="success">{{ role }}
              </el-tag>
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
import { ElMessageBox } from "element-plus";

import { getUseAuthStore, getUseHistoryBarStore, getUseNavbarStore } from "@/common/stores";

export default {
  name: "VafUserinfo",
  computed: {
    ifPrefixDivider() {
      const store = getUseNavbarStore(this.$vafAppId)();
      return store.menus.length && store.ifUserinfo;
    },
    userinfo() {
      const store = getUseAuthStore(this.$vafAppId)();
      return store.userinfo;
    },
    roles() {
      const store = getUseAuthStore(this.$vafAppId)();
      return store.roles;
    },
  },
  methods: {
    logout() {
      ElMessageBox.confirm(
        "退出前，请确认您的操作已经执行完毕。",
        "您确定要退出吗？",
        {
          autofocus: false,
          showClose: false,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: async (action, instance, done) => {
            if (action === "confirm") {
              instance.showCancelButton = false;
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "正在退出...";

              const authStore = getUseAuthStore(this.$vafAppId)();
              const [err] = await authStore.logout();
              if (!err) {
                // 清除tab的页面历史记录
                const historyStore = getUseHistoryBarStore(this.$vafAppId)();
                historyStore.$patch({ list: [], currentFullPath: "" });

                done();
                this.$router.push("/login");
              } else {
                instance.showCancelButton = true;
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = "确定";
              }
            } else {
              done();
            }
          },
        }
      ).catch(() => { });
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
