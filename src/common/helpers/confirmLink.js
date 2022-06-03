import { ElMessageBox } from "element-plus";

const confirmLink = (link, options = {}) => {
  const {
    showClose = true,
    showCancelButton = true,
    closeOnClickModal = true,
  } = options;

  // 打开网页
  let title = "提示";
  let desc = `打开新页面：<a href='${link}' target="_blank">${link}</a>`;

  ElMessageBox.confirm(desc, title, {
    showClose,
    showCancelButton,
    closeOnClickModal,

    dangerouslyUseHTMLString: true,
    showConfirmButton: false,
    cancelButtonText: "关闭",
    type: "prompt",
  }).catch((err) => {
    console.log(err);
  });
};

export default confirmLink;
