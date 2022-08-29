import type { ComponentOptions } from "vue";

import { h } from "vue";
import VafPageLayout from "@/common/layouts/VafPageLayout.vue";

// 植入了VafPageLayout和微前端外壳的路由
export default function attachMicroLayout(microRoutes = []) {
  return microRoutes
    .filter((item) => {
      // item必须是含有component，同时不包含children子项的路由
      return item.component && !item.children;
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
            component:
              typeof component === "object"
                ? component instanceof Promise
                  ? () => attachPendingMicroShell(component) // 方式1: component: import('xxx.js')
                  : attachMicroShell(component) // 方式2: component: { ... }
                : // 方式3: component: ()=> import('xxx.js')
                typeof component === "function"
                ? () => attachAsyncMicroShell(component)
                : null,
          },
        ],
      };
    });
}

// 通过这种方式 component: { ... } 引入的 MicroPageConfig，
// 直接包壳。
function attachMicroShell(conf: MicroPageConfig = {}) {
  const { name, beforeMount, mounted, beforeUnmount, unmounted } = conf;
  const Shell: ComponentOptions = {
    name: name || `vaf-micro-shell-${attachMicroShell.count++}`,
    render() {
      return h("div", { class: "vaf-micro-shell", ref: "shell" });
    },
  };
  beforeMount &&
    (Shell.beforeMount = function () {
      beforeMount.call(this);
    });
  mounted &&
    (Shell.mounted = function () {
      mounted.call(this);
    });
  beforeUnmount &&
    (Shell.beforeUnmount = function () {
      beforeUnmount.call(this);
    });
  unmounted &&
    (Shell.unmounted = function () {
      unmounted.call(this);
    });
  return Shell;
}
attachMicroShell.count = 0;

// 通过这种方式 component: import('xxx.js') 引入的 MicroPageConfig，
// 先异步取到配置，再去包壳。
async function attachPendingMicroShell(pending: ViteModulePromise) {
  const module = await Promise.resolve(pending);
  return attachMicroShell(module.default);
}

// 通过这种方式 component: ()=> import('xxx.js') 引入的 MicroPageConfig，
// 先异步取到配置，再去包壳。
async function attachAsyncMicroShell(asynFunc: ViteModuleAsyncFunc) {
  const module = await asynFunc();
  return attachMicroShell(module.default);
}

interface MicroPageConfig {
  name?: string;
  beforeMount?: () => void;
  mounted?: () => void;
  beforeUnmount?: () => void;
  unmounted?: () => void;
}
interface ViteModule {
  default: MicroPageConfig;
}
type ViteModulePromise = Promise<ViteModule>;
interface ViteModuleAsyncFunc {
  (): ViteModulePromise;
}
