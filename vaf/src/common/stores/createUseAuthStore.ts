import { defineStore } from "pinia";

const useStores: { [key: string]: any } = {};

export const createUseAuthStore = (vafAppId: string, dataFuncConfig: any) => {
  const useAuthStore = defineStore(`VafAuthStore--${vafAppId}`, {
    state(): State {
      return {
        // 数据来自 dataFuncConfig.login
        token: "",

        isLoadingUserinfo: false, // 是否正在加载用户信息

        // 数据来自 dataFuncConfig.getUserinfo
        userinfo: {},
        roles: [],
      };
    },
    actions: {
      async login(payload: any) {
        const { username, password } = payload;
        const [err, data] = await dataFuncConfig.login({ username, password });
        if (!err) {
          this.token = data.token;
        }
        return [err, data];
      },
      async getUserinfo() {
        this.isLoadingUserinfo = true;
        const [err, data] = await dataFuncConfig.getUserinfo();

        // 问题:
        // 因为使用的es模块加载, 所以首次打开应用执行登录操作, 做完登录操作后,
        // 在跳往目标页面时, 会去import目标页面的es模块.
        // 此时由于目标页面会加载完成, 而直接关闭loading组件, 会导致还在登录页停留.
        //
        // 处理方案:
        // 需要监听路由变化, 如果已经加载并进入目标页面路由, 则关闭loading组件.
        // 因为vue-router为提供解绑afterEach钩子的api,
        // 所以在createAttachAfterEach文件里的afterEach钩子里面关闭loading.

        if (!err) {
          const { userinfo, roles } = data;
          this.userinfo = userinfo;
          this.roles = roles;
        } else {
          // 清除用户信息，避免循环重定向到500页面
          this.clear();
        }

        return [err, data];
      },
      async logout() {
        const [err, data] = await dataFuncConfig.logout();
        if (!err) {
          this.clear();
        }
        return [err, data];
      },
      clear() {
        this.token = "";
        this.userinfo = {};
        this.roles = [];
      },
    },
  });

  useStores[vafAppId] = useAuthStore;
  return useAuthStore;
};

export const getUseAuthStore = (vafAppId: string) => {
  return useStores[vafAppId];
};

interface State {
  token: string;
  isLoadingUserinfo: Boolean;
  userinfo: null | UserInfo;
  roles: string[];
}

interface UserInfo {
  username?: string;
  nickname?: string;
  avatar?: string;
}
