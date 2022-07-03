import VafPageLayout from "@/common/layouts/VafPageLayout.vue";

// 为了方便外部使用，植入VafPageLayout的操作统一由内部处理
export default function attachVafPageLayout(pageRoutes) {
  return pageRoutes
    .filter((item) => {
      // item必须是含有component，同时不包含children子项的路由
      return item.component && !item.children;
    })
    .map((item) => {
      // console.log(JSON.stringify(item, null, 2));
      const { beforeEnter, component, ...rest } = item;

      return {
        ...rest,
        component: VafPageLayout,
        children: [
          {
            ...rest,
            beforeEnter, //文档 https://router.vuejs.org/zh/api/#beforeenter
            component,
          },
        ],
      };
    });
}
