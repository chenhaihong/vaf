export default {
  hideUserinfo: false,
  menus: [
    {
      type: "router-link",
      path: "/home",
      title: "首页",
      icon: "House",
      authLevel: 0,
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
