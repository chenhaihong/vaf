<script lang="jsx">
import { createApp } from "vue";
import { ElButton, ElDialog, ElLink, ElResult } from "element-plus";

const confirmLink = (link) => {
  let root = document.createElement("div");
  let hideApp = null;
  let app = createApp({
    components: { ElButton, ElDialog, ElLink, ElResult },
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      hide() {
        this.visible = false;
      },
      unmount() {
        app.unmount();
        app = null;
      },
    },
    render() {
      const extra = () => {
        return (
          <div>
            <el-button onClick={this.hide} style="margin-right:10px;">
              取消
            </el-button>
            <el-link href={link} target="_blank">
              <el-button type="primary" onClick={this.hide}>
                确定
              </el-button>
            </el-link>
          </div>
        );
      };

      return (
        <el-dialog
          v-model={this.visible}
          append-to-body
          show-close={false}
          onClosed={this.unmount}
          custom-class="vaf-confirm-link-dialog"
        >
          <el-result icon="warning" title="确定打开新页面吗？" sub-title={link}>
            {{ extra }}
          </el-result>
        </el-dialog>
      );
    },
    mounted() {
      document.body.appendChild(root);
      hideApp = this.hide;
    },
    unmounted() {
      root.remove();
      root = null;
      hideApp = null;
    },
  });
  app.mount(root);
  return hideApp;
};

export default confirmLink;
</script>

<style lang="scss">
@include b(confirm-link-dialog) {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body .el-result {
    padding: 0;
  }
}
</style>
