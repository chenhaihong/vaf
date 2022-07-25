<script lang="jsx">
import previewImage from "../previewImage.jsx";

function renderTypeUpload(prop, typeProps = {}) {
  // 图片上传成功后，修改 file-list，让预览图正常显示
  const onSuccess = (response, uploadFile, uploadFiles) => {
    // console.log(response, uploadFile, uploadFiles);
    const L = this.model[prop].length;
    this.model[prop][L - 1] = {
      name: uploadFile.name,
      url: response.data?.url,
    };

    // 图片上传成功后，修改 file-list，为其添加index值，
    // 让预览图数组正常按顺序显示
    this.model[prop].forEach((item, idx) => {
      item.index = idx;
    });

    this.handlePropChange(prop, this.model[prop]);
  };

  const onRemove = () => {
    this.handlePropChange(prop, this.model[prop]);
  };

  // 当 listType为 "picture-card"时，让预览按钮支持预览图片
  const onPreview = (a) => {
    if (typeProps?.listType === "picture-card") {
      const imageUrls = this.model[prop].map((item) => item.url);
      previewImage(imageUrls, a.index);
    }
  };

  return (
    <div className="vaf-pro-form__upload">
      <el-upload
        v-model:file-list={this.model[prop]}
        onSuccess={onSuccess}
        onRemove={onRemove}
        onPreview={onPreview}
        {...typeProps}
      >
        <el-button>上传</el-button>
      </el-upload>
    </div>
  );
}

export default renderTypeUpload;
</script>

<style lang="scss">
@include b(pro-form) {
  // 修复上传组件，listType = "picture" 时，预览列表显示异常的的bug
  // 1. 图片状态标签显示异常
  .el-upload-list--picture
    .el-upload-list__item
    .el-upload-list__item-status-label,
  // 2. 上传组件的关闭按钮显示异常
  .el-upload-list--picture .el-upload-list__item .el-icon--close {
    z-index: 1;
  }

  // 修复上传组件，listType = "text"||"pacture" 时，预览列表显示宽度无法显示100%的bug
  .vaf-pro-form__upload {
    flex: 1;
  }
}
</style>
