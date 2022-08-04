import { defineStore } from "pinia";

const useStores = {};

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
      async login(payload) {
        const { username, password } = payload;
        const [err, data] = await dataFuncConfig.login({ username, password });
        if (!err) {
          this.token = data.token;
        }
        return [err, data];
      },
      async getUserinfo() {
        const [err, data] = await dataFuncConfig.getUserinfo();
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
