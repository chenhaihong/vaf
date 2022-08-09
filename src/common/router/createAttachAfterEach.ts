import type {
  NavigationFailure,
  Router,
  RouteLocationNormalized,
} from "vue-router";

import NProgress from "nprogress";
import { NavigationFailureType, isNavigationFailure } from "vue-router";

import { getUseAuthStore } from "@/common/stores";

const createAttachAfterEach =
  (vafAppId: string) =>
  ($router: Router, settingConfig: any = {}): void => {
    $router.afterEach(
      (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        failure: NavigationFailure
      ) => {
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
          return console?.warn("Failed navigation: ", failure);
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
      }
    );
  };

export default createAttachAfterEach;
