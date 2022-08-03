import { defineStore } from "pinia";

const useStores = {};

export const createUseAuthStore = (vafAppId: string, dataFuncConfig: any) => {
  const useAuthStore = defineStore(`VafAuthStore--${vafAppId}`, {
    state(): State {
      return {
        // 数据来自接口 apiConfog.loginUrl
        token: "",

        isLoadingUserinfo: false, // 是否正在加载用户信息

        // 数据来自接口 apiConfog.getUserinfoUrl
        userinfo: {},
        roles: [],
      };
    },
    actions: {
      async login(payload) {
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

        // 1. 偷懒式等待路由跳往目标地址
        // 2. 让loading组件显示久一点
        setTimeout(() => {
          this.isLoadingUserinfo = false;
        }, 1000);

        if (!err) {
          const { userinfo, roles } = data;
          this.userinfo = userinfo;
          this.roles = roles;
        }
        return [err, data];
      },
      async logout() {
        const [err, data] = await dataFuncConfig.logout();
        if (!err) {
          this.token = "";
          this.roles = [];
          this.userinfo = {};
        }
        return [err, data];
      },
    },
  });

  useStores[vafAppId] = useAuthStore;
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
