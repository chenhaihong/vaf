export default {
  logo: "https://map.tiiit.cn/deer.png", // 侧边栏上的logo的地址
  menus: [
    {
      // router-link示例
      type: "router-link",
      id: "/home",
      path: "/home",
      title: "首页",
      children: [
        {
          type: "router-link",
          id: "/home",
          path: "/home",
          title: "首页",
        },
        {
          type: "http-link",
          path: "https://staging-cn.vuejs.org/",
          title: "外链-Vue3",
        },
        {
          type: "http-link",
          path: "https://element-plus.gitee.io/zh-CN/",
          title: "外链-饿了么",
        },
      ],
    },
    {
      // 菜单组示例
      // router-link + children
      type: "router-link",
      id: "/super-admin",
      path: "/super-admin/api/admin-api",
      title: "页面路由",
      children: [
        {
          type: "router-link",
          id: "/super-admin/admin",
          path: "/super-admin/admin",
          title: "403-管理员",
        },
        {
          type: "router-link",
          id: "/super-admin/admin-role",
          path: "/super-admin/admin-role",
          title: "403-角色",
        },
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
          type: "http-link",
          path: "https://staging-cn.vuejs.org/",
          title: "外链-Vue3",
        },
      ],
    },
    {
      // router-link示例
      type: "router-link",
      id: "/helloworld",
      path: "/helloworld",
      title: "原生路由",
    },
    {
      type: "http-link",
      path: "https://staging-cn.vuejs.org/",
      title: "外链Vue",
    },
    {
      // 菜单组示例
      // router-link + children
      type: "router-link",
      id: "/pro-components",
      path: "/pro-components/vaf-pro-form",
      title: "Pro组件",
      children: [
        {
          type: "router-link",
          id: "/pro-components/vaf-pro-form",
          path: "/pro-components/vaf-pro-form",
          title: "Pro表单",
        },
        {
          type: "router-link",
          id: "/pro-components/vaf-pro-table",
          path: "/pro-components/vaf-pro-table",
          title: "Pro表格",
        },
      ],
    },
  ],
};
