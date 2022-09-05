import VafPageLayout from "@/common/layouts/VafPageLayout.vue";

// 为了方便外部使用，植入VafPageLayout的操作统一由内部处理
export default function attachVafPageLayout(pageRoutes) {
  return pageRoutes
    .filter((item) => {
      // item必须是含有component子项的路由
      return item.component;
    })
    .map((item) => {
      // console.log(JSON.stringify(item, null, 2));
      const { beforeEnter, component, meta: sourceMeta = {}, ...rest } = item;
      const meta = { ...sourceMeta, VafIsPageRoute: true };
      return {
        ...rest,
        component: VafPageLayout,
        meta,
        children: [
          {
            ...rest,
            meta,
            beforeEnter, //文档 https://router.vuejs.org/zh/api/#beforeenter
            component,
          },
        ],
      };
    });
}
