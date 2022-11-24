/**
 * 微路由示例页面
 */

export default {
  name: "hello-micro",
  mounted() {
    const shell = this.$refs.shell;
    const ul = document.createElement("ul");
    const arr = [1, 2, 3, 4, 5, 6];
    arr.forEach((item, idx) => {
      const li = document.createElement("li");
      li.innerHTML = idx;
      ul.appendChild(li);
    });
    shell.appendChild(ul);
  },
  beforeUnmount() {
    const shell = this.$refs.shell;
    shell.innerHTML = null;
  },
};
