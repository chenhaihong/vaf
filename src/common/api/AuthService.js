import { getRequest } from "@/common/helpers/request";

// 实例池
const authServices = {};

export const makeAuthService = (vafAppId, apiConfig = {}) => {
  const request = getRequest(vafAppId);

  class AuthService {
    static login({ username, password } = {}) {
      const data = { username, password };
      return request({ url: apiConfig.loginUrl, method: "post", data });
    }
    static getUserinfo() {
      return request({ url: apiConfig.getUserinfoUrl, method: "get" });
    }
    static logout() {
      return request({ url: apiConfig.logoutUrl, method: "get" });
    }
  }

  authServices[vafAppId] = AuthService;

  return AuthService;
};

export const getAuthService = (vafAppId) => {
  return authServices[vafAppId];
};
