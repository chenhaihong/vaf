// 用于本地play包的开发
import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  // 全局组件
  export interface GlobalComponents {
    // VafEcharts: typeof import("../vaf")["VafEcharts"];
    // VafFragment: typeof import("../vaf")["VafFragment"];
    // VafProForm: typeof import("../vaf")["VafProForm"];
    // VafProTable: typeof import("../vaf")["VafProTable"];
  }

  // 组件的自定义属性
  interface ComponentCustomProperties {
    $vafAppId: string;
    // $confirmLink: typeof import("../vaf")["confirmLink"];
    // $request: typeof import("../vaf")["request"];
  }
}

export {};
