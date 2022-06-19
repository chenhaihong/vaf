// home
export default [
  {
    path: "/home",
    meta: {
      VafLeftmenuId: "/home",
      VafAuthLevel: 1,
      title: "首页",
    },
    component: () => import("../../../pages/Home.vue"),
  },
];
