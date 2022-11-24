// home
export default [
  {
    path: "/home",
    meta: {
      VafId: "/home",
      VafAuthLevel: 1,
      title: "首页",
    },
    component: () => import("../../../pages/Home.vue"),
  },
];
