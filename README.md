# @erye/vaf

[![npm](https://img.shields.io/npm/v/@erye/vaf)](https://www.npmjs.com/package/@erye/vaf)
[![npm (custom registry)](https://img.shields.io/npm/v/@erye/vaf/latest?label=npmmirror&logo=npmmirror&registry_uri=https%3A%2F%2Fregistry.npmmirror.com)](https://npmmirror.com/package/@erye/vaf)

通用的管理后台框架。

## 快速搭建 vaf 项目

执行下面命令，使用 [`@erye/create-vaf`](https://www.npmjs.com/package/@erye/create-vaf) 生成代码模板，

```shell
# 在当前工作空间下生成
$ npm create @erye/vaf

# 或在当前工作空间的helloworld目录下生成
$ npm create @erye/vaf helloworld
```

## 使用示例

<details>
  <summary>创建 VafApp 实例</summary>

```javascript
import "element-plus/dist/index.css";
import "@erye/vaf/dist/index.css";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {
  createVafApp,
  installVafComponents,
  installVafProComponents,
  getRequest,
} from "@erye/vaf";

const { app } = createVafApp({
  settingConfig: {
    name: "Vue Admin Framework",
    slogan: "方便、快捷、精准",
    logo: "/logo.png",
    copyright: "本网站属于个人技术分享网站",
  },
  dataFuncConfig: {
    login: AuthService.login,
    getUserinfo: AuthService.getUserinfo,
    logout: AuthService.logout,
  },
  leftmenuConfig: {
    logo: "/logo.png", // 左侧菜单的logo
    menus: [
      {
        type: "router-link", // 可以有children，即可以有子菜单
        id: "/home",
        path: '/home',
        title: "首页",
        children: [],
        // 依赖这2个字段方式，来完成左侧菜单的角色过滤
        authLevel: 2, // 0=>匿名 | 1=>登录(默认) | 2=>需鉴别角色
        authRoles: ["super-admin"], // 当鉴权等级为2时，该字段才有效，默认为空数组
      },
      {
        type: "http-link", // 不可以有children，即不可以有子菜单
        path: "https://staging-cn.vuejs.org/",
        title: "Vue3",
      },
    ],
  },
  routeConfig: {
    mode = "hash", // hash || history
    base = "/",
    // vaf约束的路由配置，会插在VafPageLayout中。
    // 约束只能使用一个层级的路由, 也就是不能有children选项。
    pageRoutes: [
      {
        path: "/home",
        meta: {
          VafLeftmenuId: "/home",
          VafAuthLevel: 1,
          title: "首页",
        },
        component: () => import("./pages/Home.vue"),
      },
      {
        path: "/super-admin/admin",
        meta: {
          VafLeftmenuId: "/super-admin/admin",
          // 依赖这2个字段方式，来完成路由的鉴权
          VafAuthLevel: 2, // 0=>匿名 | 1=>登录(默认) | 2=>需鉴别角色
          VafAuthRoles: ["super-admin"], // 当鉴权等级为2时，该字段才有效，默认为空数组
          title: "管理员",
        },
        component: () => import("./pages/SuperAdmin/Admin.vue"),
      },
    ],
    // 原生的路由配置，不做约束，可以使用多层级路由。
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
    // 路由守卫函数参数与VueRouter的保持一致 https://router.vuejs.org/zh/api/#aftereach
    globalNavigationGuards: {
      // beforeEach() {}, // 如果设置了，会覆盖内置的beforeEach守卫
      // afterEach() {},// 如果设置了，会覆盖内置的afterEach守卫
      // beforeResolve() {},
      // onError() {},
    },
  },
});
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(installVafProComponents);
app.use(installVafComponents);
app.mount("#app");
```

</details>

## 内置的全局组件

- [表单重组件 `vaf-pro-form`](https://github.com/chenhaihong/vaf/tree/main/src/ProComponents/VafProForm)
- [表格重组件 `vaf-pro-table`](https://github.com/chenhaihong/vaf/tree/main/src/ProComponents/VafProTable)
- [图表组件 `vaf-echarts`](https://github.com/chenhaihong/vaf/tree/main/src/components/VafEcharts)
- [`fragment` 组件 `vaf-fragment`](https://github.com/chenhaihong/vaf/tree/main/src/components/VafFragment)
