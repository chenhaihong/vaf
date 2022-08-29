/**
 * 微路由
 */

export default [
  {
    path: "/hello-micro",
    name: "/hello-micro",
    meta: {
      // VafId与sidebarConfig.menus里的菜单的id相互对应。
      // 当切换路由时, 程序内部根据VafId来找到sidebarConfig.menus里对应的菜单,
      // 将它们加上高亮样式.
      VafId: "/hello-micro",

      // 依赖这2个字段方式，来完成路由的鉴权
      VafAuthLevel: 1, // 0=>匿名 | 1=>登录(默认) | 2=>需鉴别角色
      VafAuthRoles: [], // 当鉴权等级为2时，该字段才有效，默认为空数组

      title: "Hello Micro",
    },
    // console.log(component, typeof component, component instanceof Promise);
    // component: import("../../pages/HelloMicro"), // Promise {<pending>}, object, true
    component: () => import("../../pages/HelloMicro"), // ()=>{}, function, false
  },
];
