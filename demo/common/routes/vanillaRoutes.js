export default [
  {
    redirect: "/home",
    path: "/",
    name: "/",
  },
  {
    path: "/helloworld",
    name: "/helloworld",
    meta: {
      // VafId与sidebarConfig.menus里的菜单的id相互对应。
      // 当切换路由时, 程序内部根据VafId来找到sidebarConfig.menus里对应的菜单,
      // 将它们加上高亮样式.
      VafId: "/helloworld",

      // 依赖这2个字段方式，来完成路由的鉴权
      VafAuthLevel: 0, // 0=>匿名 | 1=>登录(默认) | 2=>需鉴别角色
      VafAuthRoles: [], // 当鉴权等级为2时，该字段才有效，默认为空数组

      title: "Hello World",
    },
    component: () => import("../../pages/HelloWorld.vue"),
  },
];
