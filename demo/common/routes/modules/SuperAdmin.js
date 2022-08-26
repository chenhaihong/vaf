export default [
  // 超管
  {
    path: "/super-admin/admin",
    meta: {
      VafId: "/super-admin/admin",
      VafAuthLevel: 2,
      VafAuthRoles: ["super-admin"],
      title: "管理员",
    },
    component: () => import("../../../pages/SuperAdmin/Admin.vue"),
  },
  {
    path: "/super-admin/admin-role",
    meta: {
      VafId: "/super-admin/admin-role",
      VafAuthLevel: 2,
      VafAuthRoles: ["super-admin"],
      title: "管理员角色",
    },
    component: () => import("../../../pages/SuperAdmin/AdminRole.vue"),
  },
  {
    path: "/super-admin/api/admin-api",
    meta: {
      VafId: "/super-admin/api/admin-api",
      VafAuthLevel: 2,
      VafAuthRoles: ["admin", "super-admin"],
      title: "管理员API",
    },
    component: () => import("../../../pages/SuperAdmin/AdminApi.vue"),
  },
  {
    path: "/super-admin/api/client-api",
    meta: {
      VafId: "/super-admin/api/client-api",
      VafAuthLevel: 2,
      VafAuthRoles: ["admin", "super-admin"],
      title: "客户端API",
    },
    component: () => import("../../../pages/SuperAdmin/ClientApi.vue"),
  },
];
