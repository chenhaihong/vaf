// 0 waiting
// 1 loading
// 2 success
// 3 error
let styleStatus = 0;
let jsStatus = 0;

// 注册一个全局自定义指令 `v-hljs`
const install = (app) => {
  app.directive("hljs", {
    created() {
      loadAll();
    },
    mounted(el) {
      render(el);
    },
    updated(el) {
      render(el);
    },
    beforeUnmount(el) {
      el.__hljsRenderTimeoutId__ && clearTimeout(el.__hljsRenderTimeoutId__);
    },
  });
};

export default install;

async function loadAll() {
  await Promise.all([loadStyle(), loadJs()]);
  if (styleStatus !== 2 || jsStatus !== 2) {
    setTimeout(loadAll, 30);
  }
}

function loadStyle() {
  if (styleStatus === 1) {
    return false;
  }
  if (styleStatus === 2) {
    return true;
  }
  return new Promise((res) => {
    styleStatus = 1;
    const link = document.createElement("link");
    link.href =
      "https://cdn.staticfile.org/highlight.js/10.2.0/styles/vs2015.min.css";
    link.rel = "stylesheet";
    link.addEventListener("load", () => {
      styleStatus = 2;
      res(true);
    });
    link.addEventListener("error", () => {
      styleStatus = 3;
      res(false);
    });
    document.head.appendChild(link);
  });
}

function loadJs() {
  if (jsStatus === 1) {
    return false;
  }
  if (jsStatus === 2) {
    return true;
  }
  return new Promise((res) => {
    jsStatus = 1;
    const script = document.createElement("script");
    script.src =
      "https://cdn.staticfile.org/highlight.js/10.2.0/highlight.min.js";
    script.addEventListener("load", () => {
      jsStatus = 2;
      res(true);
    });
    script.addEventListener("error", () => {
      jsStatus = 3;
      res(false);
    });
    document.body.appendChild(script);
  });
}

function render(el) {
  if (styleStatus === 2 && jsStatus === 2) {
    highlight(el);
  } else {
    el.__hljsRenderTimeoutId__ && clearTimeout(el.__hljsRenderTimeoutId__);
    el.__hljsRenderTimeoutId__ = setTimeout(() => {
      render(el);
    }, 30);
  }
}

function highlight(el) {
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
  window.hljs?.highlightBlock(copy);
}
