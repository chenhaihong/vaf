/**
 * 构建鉴权相关的store模块
 */

export default function makeAuthModule(dataFuncConfig) {
  return {
    namespaced: true,
    state: {
      // 数据来自接口 apiConfog.loginUrl
      token: "",

      isLoadingUserinfo: false, // 是否正在加载用户信息

      // 数据来自接口 apiConfog.getUserinfoUrl
      userinfo: {},
      roles: [],
    },
    getters: {},
    mutations: {
      setIsLoadingUserinfo(state, isLoading) {
        state.isLoadingUserinfo = isLoading;
      },
      setToken(state, token) {
        state.token = token;
      },
      setUserinfo(state, { userinfo, roles } = {}) {
        state.userinfo = userinfo;
        state.roles = roles;
      },
      clear(state) {
        state.token = "";
        state.roles = [];
        state.userinfo = {};
      },
    },
    actions: {
      async login({ commit }, payload) {
        const { username, password } = payload;
        const [err, data] = await dataFuncConfig.login({ username, password });
        if (!err) {
          commit("setToken", data.token);
        }
        return [err, data];
      },
      async getUserinfo({ commit }) {
        commit("setIsLoadingUserinfo", true);
        const [err, data] = await dataFuncConfig.getUserinfo();

        // 1. 偷懒式等待路由跳往目标地址
        // 2. 让loading组件显示久一点
        setTimeout(() => {
          commit("setIsLoadingUserinfo", false);
        }, 1000);

        if (!err) {
          const { userinfo, roles } = data;
          commit("setUserinfo", { userinfo, roles });
        }
        return [err, data];
      },
      async logout({ commit }) {
        const [err, data] = await dataFuncConfig.logout();
        if (!err) {
          commit("clear");
        }
        return [err, data];
      },
    },
  };
}
