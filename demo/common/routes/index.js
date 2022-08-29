import vanillaRoutes from "./vanillaRoutes";
import microRoutes from "./microRoutes";

import home from "./modules/Home";
import SuperAdmin from "./modules/SuperAdmin";
import ProComponents from "./modules/ProComponents";

export default {
  mode: "history",
  base: "/",
  pageRoutes: [...home, ...SuperAdmin, ...ProComponents],
  vanillaRoutes,
  microRoutes,
};
