# vaf-echarts

简易的 `echarts` 组件，内置了颜色选项。

## 1. vaf-echarts 属性

| 属性         | 说明                                                                  | 类型      | 默认值  |
| ------------ | --------------------------------------------------------------------- | --------- | ------- |
| `loading`    | 展示加载动画效果                                                      | `boolean` | `false` |
| `option`     | [配置项](https://echarts.apache.org/zh/option.html)                   | `object`  | `{}`    |
| `autoResize` | 自动改变图表尺寸                                                      | `boolean` | `true`  |
| `events`     | [事件处理函数列表对象](https://echarts.apache.org/zh/api.html#events) | `object`  | `{}`    |

## 2. vaf-echarts 方法

| 方法名               | 说明                                           | 类型                    |
| -------------------- | ---------------------------------------------- | ----------------------- |
| `getEchartsInstance` | 拿到内部的 `echartsInstance` 实例              | `() => echartsInstance` |
| `updateOption`       | 设置图表实例的配置项以及数据                   | `() => void`            |
| `resize`             | 改变图表尺寸，在容器大小发生改变时可以手动调用 | `() => void`            |

## 3. 载入 `echarts`

这里不从 npm 包引入，可以使用下面 2 种方式引入。

### 3.1 `script` 标签引入

```html
<script src="https://cdn.staticfile.org/echarts/5.3.3/echarts.min.js"></script>
```

### 3.2 动态引入

```javascript
function loadJs(src, cb) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    cb(window.echarts);
  };

  document.body.appendChild(script);
}

loadJs(
  "https://cdn.staticfile.org/echarts/5.3.3/echarts.min.js",
  function (echarts) {
    // ...
  }
);
```
