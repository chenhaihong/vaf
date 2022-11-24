import axios from "axios";

import { ElMessage, ElMessageBox } from "element-plus";

import { getUseAuthStore } from "@/common/stores";
import { getRouter } from "@/common/router";

//请求实例池
const instances = {};

export const makeRequest = (vafAppId) => {
  const $store = getUseAuthStore(vafAppId)();
  const $router = getRouter(vafAppId);

  // create an axios instance
  const instance = axios.create({
    // baseURL: '/', // 不设置，外部传递完成的请求地址
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    timeout: 30000, // request timeout
  });

  // request interceptor
  instance.interceptors.request.use((config) => {
    const token = $store.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      const res = response.data;
      if (res.success) {
        return [null, res.data];
      }

      const error = res.error || {};
      const code = parseInt(error.code);
      switch (code) {
        case 5010001: // 用户登录凭证已经失效
        case 5020001: // 该管理员账号不存在
        case 5020002: // 该管理员账号已暂停使用
          // 清除用户信息
          $store.$patch({ token: "", userinfo: {}, roles: [] });
          ElMessageBox.confirm(error.message || "登录失效", "请重新登录", {
            showClose: false,
            closeOnClickModal: false,
            confirmButtonText: "重新登录",
            showCancelButton: false,
            type: "warning",
            callback() {
              const pathHash = encodeURIComponent(
                encodeURIComponent(location.href)
              );
              $router.replace(`/login?redirect=${pathHash}`);
            },
          });
          break;
        default:
          ElMessage({
            message: error.message || "请求服务失败，请重试",
            type: "error",
            duration: 5000,
          });
          break;
      }
      return [new Error(error.message || "Error"), null];
    },
    (error) => {
      ElMessage({
        message: error.message,
        type: "error",
        duration: 5000,
      });
      return [error, null];
    }
  );

  instances[vafAppId] = instance;
  return instance;
};

export const getRequest = (vafAppId) => {
  return instances[vafAppId];
};
