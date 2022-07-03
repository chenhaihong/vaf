import { createApp } from "vue";
import { ElImageViewer } from "element-plus";

export default function previewImage(imageUrls, initialIndex = 0) {
  const root = document.createElement("div");
  const onClose = () => {
    app.unmount();
  };
  const app = createApp({
    render() {
      return (
        <el-image-viewer
          url-list={imageUrls}
          initialIndex={initialIndex}
          teleported={true}
          onClose={onClose}
        ></el-image-viewer>
      );
    },
    mounted() {
      document.body.appendChild(root);
    },
    unmounted() {
      root.remove();
    },
  });
  app.use(ElImageViewer);
  app.mount(root);

  return onClose;
}
