export default {
  hideUserinfo: false,
  enableFilter: false,
  menus: [
    {
      // 菜单组示例
      // router-link + children
      type: "router-link",
      id: "/pro-components",
      path: "/pro-components/vaf-pro-form",
      title: "Pro组件",
      icon: "Cpu",
      authLevel: 0,
      children: [
        {
          type: "router-link",
          id: "/pro-components/vaf-pro-form",
          path: "/pro-components/vaf-pro-form",
          title: "Pro表单",
          authLevel: 0,
        },
        {
          type: "router-link",
          id: "/pro-components/vaf-pro-table",
          path: "/pro-components/vaf-pro-table",
          title: "Pro表格",
          authLevel: 0,
        },
      ],
    },
    {
      type: "http-link",
      id: "https://cn.vuejs.org/",
      path: "https://cn.vuejs.org/",
      title: "Vue",
      icon: "Document",
      authLevel: 0,
    },
    {
      type: "http-link",
      id: "https://element-plus.org/zh-CN/",
      path: "https://element-plus.org/zh-CN/",
      title: "饿了么",
      authLevel: 2,
    },
  ],
};
