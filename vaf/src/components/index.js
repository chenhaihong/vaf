import VafEcharts from "./VafEcharts/VafEcharts.vue";
import VafFragment from "./VafFragment/VafFragment.vue";

function install(app) {
  app.component(VafEcharts.name, VafEcharts);
  app.component(VafFragment.name, VafFragment);
}

export default install;

export { VafEcharts, VafFragment };
