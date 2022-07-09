import { App } from "vue";
import mitt from "@/helpers/mitt";

const bus = mitt();

let styleStatus = 0;
let jsStatus = 0;

function highlight(el: any) {
  if (el.__hljsDOM__) {
    el.__hljsDOM__.remove();
    el.__hljsDOM__ = null;
  }

  el.style.display = "none";
  const copy = el.cloneNode(true);
  if (el.nextSibling) {
    el.parentNode.insertBefore(copy, el.nextSibling);
  } else {
    el.parentNode.appendChild(copy);
  }

  copy.style.display = "";
  el.__hljsDOM__ = copy;
  (window as any).hljs.highlightBlock(copy);
}

function render(el: any) {
  if (styleStatus === 1 && jsStatus === 1) {
    highlight(el);
  } else {
    const readyFunc = () => {
      el.__hljsReadyFunc__ = null;
      highlight(el);
    };
    el.__hljsReadyFunc__ = readyFunc;
    bus.once("ready", readyFunc);
  }
}

function loadStyle() {
  return new Promise((res) => {
    const link = document.createElement("link");
    link.href =
      "https://cdn.staticfile.org/highlight.js/10.2.0/styles/vs2015.min.css";
    link.rel = "stylesheet";
    link.addEventListener("load", () => {
      styleStatus = 1;
      res(true);
    });
    link.addEventListener("error", () => {
      styleStatus = -1;
      res(false);
    });
    document.head.appendChild(link);
  });
}

function loadJs() {
  return new Promise((res) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.staticfile.org/highlight.js/10.2.0/highlight.min.js";
    script.addEventListener("load", () => {
      jsStatus = 1;
      res(true);
    });
    script.addEventListener("error", () => {
      jsStatus = -1;
      res(false);
    });
    document.body.appendChild(script);
  });
}

async function loadAll() {
  const [res1, res2] = await Promise.all([loadStyle(), loadJs()]);
  if (res1 && res2) {
    bus.emit("ready");
  } else {
    loadAll();
  }
}

// 注册一个全局自定义指令 `v-hljs`
const install = (app: App) => {
  app.directive("hljs", {
    beforeMount() {
      loadAll();
    },
    mounted(el: HTMLElement) {
      render(el);
    },
    updated(el: HTMLElement) {
      render(el);
    },
    beforeUnmount(el: any) {
      el.__hljsReadyFunc__ && bus.off("ready", el.__hljsReadyFunc__);
    },
  });
};

export { install };
