// 鉴权api示例

const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export default function makeAuthService(vafAppId, getRequest) {
  return class AuthService {
    // username, 登录的用户名
    // password, 登录的密码
    static login = async ({ username, password }) => {
      // request, axios实例
      // const request = getRequest(vafAppId);
      await sleep(1000);
      const [error, userinfo] = [
        null,
        {
          token: "AN_jwt_token_for_dev",
        },
      ];
      return [error, userinfo];
    };

    static getUserinfo = async () => {
      // request, axios实例
      // const request = getRequest(vafAppId);
      await sleep(1000);
      const [error, userinfo] = [
        null,
        {
          userinfo: {
            username: "haihong",
            nickname: "海宏",
            avatar: "https://map.tiiit.cn/deer.png",
          },
          roles: ["admin"],
        },
      ];
      return [error, userinfo];
    };

    static logout = async () => {
      // request, axios实例
      // const request = getRequest(vafAppId);
      await sleep(1000);
      const [error, userinfo] = [null, {}];
      return [error, userinfo];
    };
  };
}
