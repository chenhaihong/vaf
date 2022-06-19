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
      VafLeftmenuId: "/helloworld", // 与leftmenu匹配的id

      // 依赖这2个字段方式，来完成路由的鉴权
      VafAuthLevel: 0, // 0=>匿名 | 1=>登录(默认) | 2=>需鉴别角色
      VafAuthRoles: [], // 当鉴权等级为2时，该字段才有效，默认为空数组

      title: "Hello World",
    },
    component: () => import("../../pages/HelloWorld.vue"),
  },
];
