function renderAnySlot(field = {}) {
  const {
    prop, // 字段名, (对应model中的属性名)
    slot, // 插槽名
  } = field;
  return () => {
    if (this.$slots[slot]) {
      return this.$slots[slot]({ prop, model: this.model });
    } else {
      return renderDefaultAnySlotTip(slot);
    }
  };
}

function renderDefaultAnySlotTip(slotName) {
  return (
    <el-alert
      title={`请在重组件 vaf-pro-form 中定义 ${slotName} 插槽，如：`}
      type="warning"
      show-icon
      closable={false}
    >
      {`<template #${slotName}="{ prop, model }"> 你的内容 </template>`}
    </el-alert>
  );
}

export default renderAnySlot;
