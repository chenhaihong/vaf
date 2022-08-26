export default [
  {
    path: "/pro-components/vaf-pro-form",
    meta: {
      VafId: "/pro-components/vaf-pro-form",
      VafAuthLevel: 1,
      title: "vaf-pro-form",
    },
    component: () => import("../../../pages/ProComponents/VafProFormDemo.vue"),
  },
  {
    path: "/pro-components/vaf-pro-table",
    meta: {
      VafId: "/pro-components/vaf-pro-table",
      VafAuthLevel: 1,
      title: "vaf-pro-table",
    },
    component: () => import("../../../pages/ProComponents/VafProTableDemo.vue"),
  },
];
