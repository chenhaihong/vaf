// 实例池
const authServices = {};

export const makeAuthService = (vafAppId, dataFuncConfig = {}) => {
  class AuthService {
    static login({ username, password } = {}) {
      return dataFuncConfig.login({ username, password });
    }
    static getUserinfo() {
      return dataFuncConfig.getUserinfo();
    }
    static logout() {
      return dataFuncConfig.logout();
    }
  }

  authServices[vafAppId] = AuthService;

  return AuthService;
};

export const getAuthService = (vafAppId) => {
  return authServices[vafAppId];
};
