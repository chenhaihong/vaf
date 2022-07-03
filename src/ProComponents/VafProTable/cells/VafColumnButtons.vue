<script lang="jsx">
export default {
  name: "VafColumnButtons",
  props: {
    buttons: { type: Array, default: () => [] },
  },
  methods: {
    click(command, row, index) {
      this.$emit("clickButton", command, row, index);
    },
    renderButtons(scope) {
      const buttons = this.buttons.map((item, index) => {
        const { command, text, buttonProps } = item;
        const click = () => this.click(command, scope.row, scope.$index);
        return (
          <el-button
            key={command}
            plain
            size="small"
            {...buttonProps}
            onClick={click}
          >
            {item.text}
          </el-button>
        );
      });
      return buttons;
    },
  },
  render() {
    const slots = {
      default: (scope) => {
        return (
          <div className="vaf-pro-table__button-group">
            <el-button-group>{this.renderButtons(scope)}</el-button-group>
          </div>
        );
      },
    };

    return (
      <el-table-column label="操作" align="left">
        {slots}
      </el-table-column>
    );
  },
};
</script>

<style lang="scss">
.vaf-pro-table__button-group {
  .el-button-group {
    display: flex;
  }
  .el-button {
    flex: 1 1 100%;
  }
}
</style>
