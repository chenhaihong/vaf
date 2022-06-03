import NProgress from "nprogress";

// TODO 定义配置约束
const VafAdminName = "Vaf Admin";

const attachAfterEach = ($router) => {
  $router.afterEach((to, from, failure) => {
    // TODO 添加导航失败的错误提示
    // if (isNavigationFailure(failure)) {
    //   console.log("failed navigation", failure);
    // }

    // finish progress bar
    NProgress.done();

    const { title = "" } = to.meta;
    document.title = title ? `${title} - ${VafAdminName}` : VafAdminName;
  });
};

export default attachAfterEach;
