import NProgress from "nprogress";

const attachAfterEach = ($router, settingConfig = {}) => {
  $router.afterEach((to, from, failure) => {
    // TODO 添加导航失败的错误提示
    // if (isNavigationFailure(failure)) {
    //   console.log("failed navigation", failure);
    // }

    // finish progress bar
    NProgress.done();

    const name = settingConfig.name || "Vaf Admin";

    const { title = "" } = to.meta;
    document.title = title ? `${title} - ${name}` : name;
  });
};

export default attachAfterEach;
