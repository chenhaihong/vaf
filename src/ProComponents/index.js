import VafFragment from "./VafFragment/VafFragment.vue";
import VafProForm from "./VafProForm/VafProForm.vue";
import VafProTable from "./VafProTable/VafProTable.vue";

function install(app) {
  app.component(VafFragment.name, VafFragment);
  app.component(VafProForm.name, VafProForm);
  app.component(VafProTable.name, VafProTable);
}

export default install;

export { VafFragment, VafProForm, VafProTable };
