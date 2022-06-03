export default {
  mode: "hash",
  base: "/",
  vanillaRoutes: [
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
      component: () => import("./pages/HelloWorld.vue"),
    },
  ],
  pageRoutes: [
    // home
    {
      path: "/home",
      meta: {
        VafLeftmenuId: "/home",
        VafAuthLevel: 1,
        title: "首页",
      },
      component: () => import("./pages/Home.vue"),
    },

    // 超管
    {
      path: "/super-admin/admin",
      meta: {
        VafLeftmenuId: "/super-admin/admin",
        VafAuthLevel: 2,
        VafAuthRoles: ["super-admin"],
        title: "管理员",
      },
      component: () => import("./pages/SuperAdmin/Admin.vue"),
    },
    {
      path: "/super-admin/admin-role",
      meta: {
        VafLeftmenuId: "/super-admin/admin-role",
        VafAuthLevel: 2,
        VafAuthRoles: ["super-admin"],
        title: "管理员角色",
      },
      component: () => import("./pages/SuperAdmin/AdminRole.vue"),
    },
    {
      path: "/super-admin/api/admin-api",
      meta: {
        VafLeftmenuId: "/super-admin/api/admin-api",
        VafAuthLevel: 2,
        VafAuthRoles: ["admin", "super-admin"],
        title: "管理员API",
      },
      component: () => import("./pages/SuperAdmin/AdminApi.vue"),
    },
    {
      path: "/super-admin/api/client-api",
      meta: {
        VafLeftmenuId: "/super-admin/api/client-api",
        VafAuthLevel: 2,
        VafAuthRoles: ["admin", "super-admin"],
        title: "管理员API",
      },
      component: () => import("./pages/SuperAdmin/ClientApi.vue"),
    },
  ],
};
