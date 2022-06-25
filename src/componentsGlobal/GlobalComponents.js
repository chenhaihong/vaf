import VafProForm from "./VafProForm/VafProForm.vue";
import VafProTable from "./VafProTable/VafProTable.vue";

function install(app) {
  app.component(VafProForm.name, VafProForm);
  app.component(VafProTable.name, VafProTable);
}

export default install;

export { VafProForm, VafProTable };
