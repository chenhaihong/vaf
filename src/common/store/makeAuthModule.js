/**
 * 构建鉴权相关的store模块
 */

import { getAuthService } from "@/common/api/AuthService";

export default function makeAuthModule(vafAppId) {
  return {
    namespaced: true,
    state: {
      // 数据来自接口 apiConfog.loginUrl
      token: "",

      // 数据来自接口 apiConfog.getUserinfoUrl
      userinfo: {},
      roles: [],
    },
    getters: {},
    mutations: {
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
        const AuthService = getAuthService(vafAppId);
        const [err, data] = await AuthService.login({ username, password });
        if (!err) {
          commit("setToken", data.token);
        }
        return [err, data];
      },
      async getUserinfo({ commit }) {
        const AuthService = getAuthService(vafAppId);
        const [err, data] = await AuthService.getUserinfo();
        if (!err) {
          const { userinfo, roles } = data;
          commit("setUserinfo", { userinfo, roles });
        }
        return [err, data];
      },
      async logout({ commit }) {
        const AuthService = getAuthService(vafAppId);
        const [err, data] = await AuthService.logout();
        if (!err) {
          commit("clear");
        }
        return [err, data];
      },
    },
  };
}
