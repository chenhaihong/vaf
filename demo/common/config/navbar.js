export default {
  hideUserinfo: false,
  menus: [
    {
      type: "router-link",
      path: "/home",
      title: "首页",
      icon: "House",
      authLevel: 0,
      children: [
        {
          type: "router-link",
          id: "/home",
          path: "/home",
          title: "首页",
          authLevel: 0,
        },
        {
          type: "http-link",
          path: "https://staging-cn.vuejs.org/",
          title: "外链-Vue3",
          authLevel: 0,
        },
        {
          type: "http-link",
          path: "https://element-plus.gitee.io/zh-CN/",
          title: "外链-饿了么",
          authLevel: 0,
        },
      ],
    },
    {
      type: "http-link",
      path: "https://cn.vuejs.org/",
      title: "Vue",
      icon: "Document",
      authLevel: 0,
    },
    {
      type: "http-link",
      path: "https://element-plus.gitee.io/zh-CN/",
      title: "饿了么",
      authLevel: 0,
    },
  ],
};
