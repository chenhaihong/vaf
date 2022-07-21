<template>
  <div ref="container" :style="$attrs.style"></div>
</template>

<script>
const echarts = window.echarts;
export default {
  name: "VafEcharts",
  inheritAttrs: false,
  props: {
    loading: { type: Boolean, default: false },
    option: { type: Object, default: () => ({}) },
    autoResize: { type: Boolean, default: false },
    events: { type: Object, default: () => ({}) },
  },
  computed: {
    optionWithColor() {
      const option = this.option;
      const colorOption = {};
      if (!option.color) {
        // 加入调色盘颜色
        colorOption.color = [
          "#FF9900",
          "#2095F2",
          "#CCCC33",
          "#A148F4",
          "#3366CC",
          "#FF6699",
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3",
        ];
      }
      return { ...option, ...colorOption };
    },
  },
  methods: {
    updateOption() {
      if (!this.echartsInstance) {
        const container = this.$refs.container;
        this.echartsInstance = echarts.init(container);
      }
      this.echartsInstance.setOption(this.optionWithColor);
    },
    resize() {
      this.$nextTick(() => {
        this.echartsInstance?.resize();
      });
    },
    getEchartsInstance() {
      return this.echartsInstance;
    },
  },
  watch: {
    option() {
      this.updateOption();
    },
    loading(val) {
      if (this.echartsInstance) {
        if (val) {
          this.echartsInstance.showLoading();
        } else {
          this.echartsInstance.hideLoading();
        }
      }
    },
    autoResize(val) {
      if (this.echartsInstance) {
        if (val) {
          window.addEventListener("resize", () => this.resize());
        } else {
          window.removeEventListener("resize", () => this.resize());
        }
      }
    },
    events: {
      deep: true,
      handler(next, prev) {
        if (this.echartsInstance) {
          Object.keys(prev).forEach((key) => {
            this.echartsInstance.off(key, val[key]);
          });
          Object.keys(next).forEach((key) => {
            this.echartsInstance.on(key, val[key]);
          });
        }
      },
    },
  },
  mounted() {
    this.updateOption();

    if (this.loading) {
      this.echartsInstance.showLoading();
    }

    const { events } = this;
    Object.entries(events).forEach(([key, value]) => {
      this.echartsInstance.on(key, value);
    });

    if (this.autoResize) {
      window.addEventListener("resize", () => this.resize());
    }
  },
  beforeUnmount() {
    if (this.autoResize) {
      window.removeEventListener("resize", () => this.resize());
    }
    if (this.echartsInstance && !this.echartsInstance.isDisposed()) {
      echarts.dispose(this.echartsInstance);
    }
  },
};
</script>
