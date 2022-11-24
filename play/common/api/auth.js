// 鉴权api示例

import { getRequest } from "@erye/vaf";
import vafAppId from "../config/vafAppId";

const request = (...options) => {
  const request = getRequest(vafAppId);
  return request(...options);
};

export default class AuthService {
  // username, 登录的用户名
  // password, 登录的密码
  static login = async ({ username, password }) => {
    // request, axios实例
    return request({ url: "/mock/auth/login", data: { username, password } });
  };

  static getUserinfo = async () => {
    return request({ url: "/mock/auth/userinfo" });
  };

  static logout = async () => {
    return request({ url: "/mock/auth/logout" });
  };
}
