import vanillaRoutes from "./vanillaRoutes";

import home from "./modules/Home";
import SuperAdmin from "./modules/SuperAdmin";
import ProComponents from "./modules/ProComponents";

export default {
  mode: "history",
  base: "/",
  vanillaRoutes,
  pageRoutes: [...home, ...SuperAdmin, ...ProComponents],
};
