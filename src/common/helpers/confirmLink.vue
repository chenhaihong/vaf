<script lang="jsx">
import { createApp } from "vue";
import { ElButton, ElDialog, ElLink, ElResult } from "element-plus";

const confirmLink = (link) => {
  let root = document.createElement("div");
  let close = null;
  let app = createApp({
    components: { ElButton, ElDialog, ElLink, ElResult },
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      hide() {
        // visible设置为false后，
        // el-dialog会执行onClosed方法。
        this.visible = false;
      },
      unmount() {
        // onClosed调用这个方法，卸载应用。
        app.unmount();
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
      close = this.hide;
    },
    unmounted() {
      root.remove();
      root = null;
      app = null;
      close = null;
    },
  });
  app.mount(root);
  return close;
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
