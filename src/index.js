export default {
  name: "@erye/vaf",
  author: "erye",
  url: "https://www.npmjs.com/package/@erye/vaf",
};

export { createVafApp, getVafApp } from "./createVafApp";
export { getPinia, getUseStores } from "@/common/stores";
export { getRouter } from "@/common/router";
export { getRequest } from "@/common/helpers/request";

export {
  default as installVafProComponents,
  VafProForm,
  VafProTable,
} from "@/ProComponents";
export {
  default as installVafComponents,
  VafEcharts,
  VafFragment,
} from "@/components";

export { default as confirmLink } from "@/common/helpers/confirmLink.vue";
