// 本地开发用来mock鉴权接口的vite插件

export default VitePluginVafAuth = () => {
  return {
    name: "vite:vaf-mock-auth",
    enforce: "pre",
    apply: "serve",
    configureServer(server) {
      // server是connect实例，中间件的文档
      // https://github.com/senchalabs/connect#use-middleware
      server.middlewares.use((req, res, next) => {
        // 开发下模拟登录请求
        if (req.url === "/vaf-auth/login") {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              success: true,
              error: { message: "成功登录" },
              data: {
                token: "AN_jwt_token_for_dev",
              },
            })
          );
        }

        // 开发下模拟获取用户信息请求
        if (req.url === "/vaf-auth/userinfo") {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              success: true,
              error: { message: "获取用户信息成功" },
              data: {
                userinfo: {
                  username: "haihong",
                  nickname: "海宏",
                  avatar: "https://map.tiiit.cn/deer.png",
                },
                roles: ["admin"],
              },
            })
          );
        }

        // 开发下模拟用户注销登录
        if (req.url === "/vaf-auth/logout") {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              success: true,
              error: { message: "成功注销" },
              data: {},
            })
          );
        }

        // 开发下模拟处理用户上传图片
        if (req.url === "/vaf/upload") {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              success: true,
              error: { message: "成功上传" },
              data: {
                name: "deer.png",
                url: "https://map.tiiit.cn/deer.png",
              },
            })
          );
        }

        next();
      });
    },
  };
};
