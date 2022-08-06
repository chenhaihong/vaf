import NProgress from "nprogress";

import { getUseAuthStore } from "@/common/stores";

const attachAfterEach =
  (vafAppId) =>
  ($router, settingConfig = {}) => {
    $router.afterEach((to, from, failure) => {
      if (failure) {
        return console?.warn("failed navigation: ", failure);
      }

      const authStore = getUseAuthStore(vafAppId)();
      if (authStore.isLoadingUserinfo) {
        authStore.isLoadingUserinfo = false;
      }

      // finish progress bar
      NProgress.done();

      const name = settingConfig.name || "Vaf Admin";

      const { title = "" } = to.meta;
      document.title = title ? `${title} - ${name}` : name;
    });
  };

export default attachAfterEach;
