// 本地开发用来mock鉴权接口的vite插件

const VitePluginMock = () => {
  return {
    name: "vite:mock",
    enforce: "pre",
    apply: "serve",
    configureServer(server) {
      // server是connect实例，中间件的文档
      // https://github.com/senchalabs/connect#use-middleware
      server.middlewares.use((req, res, next) => {
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

export default VitePluginMock;
