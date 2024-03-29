import { createApp } from "vue";
import { ElImageViewer } from "element-plus";

export default function previewImage(imageUrls, initialIndex = 0) {
  let app;
  const root = document.createElement("div");
  const close = () => {
    app.unmount();
  };
  app = createApp({
    render() {
      return (
        <el-image-viewer
          url-list={imageUrls}
          initialIndex={initialIndex}
          teleported={true}
          onClose={close}
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

  return close;
}
