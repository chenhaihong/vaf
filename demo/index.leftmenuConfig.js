export default {
  logo: "https://map.tiiit.cn/deer.png", // 侧边栏上的logo的地址
  menus: [
    {
      // router-link示例
      type: "router-link",
      id: "/home",
      path: "/home",
      title: "首页",
    },
    {
      // 菜单组示例
      // router-link + children
      type: "router-link",
      id: "/super-admin",
      path: "/super-admin/api/admin-api",
      title: "超管模块",
      children: [
        {
          type: "router-link",
          id: "/super-admin/api",
          path: "/super-admin/api/admin-api",
          title: "API",
          children: [
            {
              type: "router-link",
              id: "/super-admin/api/admin-api",
              path: "/super-admin/api/admin-api",
              title: "管理员Api",
            },
            {
              type: "router-link",
              id: "/super-admin/api/client-api",
              path: "/super-admin/api/client-api",
              title: "客户端Api",
            },
          ],
        },
        {
          type: "router-link",
          id: "/super-admin/admin",
          path: "/super-admin/admin",
          title: "管理员",
        },
        {
          type: "router-link",
          id: "/super-admin/admin-role",
          path: "/super-admin/admin-role",
          title: "管理员角色",
        },
        {
          type: "http-link",
          path: "https://staging-cn.vuejs.org/",
          title: "Vue3文档",
        },
      ],
    },
    {
      // router-link示例
      type: "router-link",
      id: "/helloworld",
      path: "/helloworld",
      title: "你好",
    },
    {
      type: "http-link",
      path: "https://staging-cn.vuejs.org/",
      title: "Vue3",
    },
    {
      type: "http-link",
      path: "https://element-plus.gitee.io/zh-CN/",
      title: "饿了么",
    },
  ],
};
