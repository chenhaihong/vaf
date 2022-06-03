// 加入默认的页面路由

import Page403 from "@/pages/403.vue";
import Page404 from "@/pages/404.vue";
import Page500 from "@/pages/500.vue";
import PageLogin from "@/pages/Login.vue";

const defaultRoutesMap = {
  "/login": {
    path: "/login",
    meta: {
      VafLeftmenuId: "/login",
      VafAuthLevel: 0,
      title: "Login",
    },
    component: PageLogin,
  },
  "/403": {
    path: "/403",
    meta: {
      VafLeftmenuId: "/403",
      VafAuthLevel: 0,
      title: "404",
    },
    component: Page403,
  },
  "/404": {
    path: "/404",
    meta: {
      VafLeftmenuId: "/404",
      VafAuthLevel: 0,
      title: "404",
    },
    component: Page404,
  },
  "/500": {
    path: "/500",
    meta: {
      VafLeftmenuId: "/500",
      VafAuthLevel: 0,
      title: "500",
    },
    component: Page500,
  },
  "/:pathMatch(.*)*": {
    path: "/:pathMatch(.*)*",
    meta: {
      VafLeftmenuId: "/:pathMatch(.*)*",
      VafAuthLevel: 0,
      title: "404",
    },
    component: Page404,
  },
};

const attachDefaultRoutes = (routes) => {
  const L = routes.length;
  ["/login", "/403", "/404", "/500", "/:pathMatch(.*)*"].forEach((path) => {
    let has = false;
    for (let i = 0; i < L; i++) {
      if (routes[i].path === path) {
        has = true;
        break;
      }
    }
    if (!has) {
      routes.push(defaultRoutesMap[path]);
    }
  });

  return routes;
};

export default attachDefaultRoutes;
