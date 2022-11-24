// high frequency form components
import renderTypeCascader from "./renderTypeHf/Cascader";
import renderTypeCheckbox from "./renderTypeHf/Checkbox";
import renderTypeCheckboxGroup from "./renderTypeHf/CheckboxGroup";
import renderTypeInput from "./renderTypeHf/Input";
import renderTypeRadioGroup from "./renderTypeHf/RadioGroup";
import renderTypeSelect from "./renderTypeHf/Select";
import renderTypeSwitch from "./renderTypeHf/Switch";
import renderTypeTextarea from "./renderTypeHf/Textarea";

// low frequency form components
import renderTypeColorPicker from "./renderTypeLf/ColorPicker";
import renderTypeDatePicker from "./renderTypeLf/DatePicker";
import renderTypeDateTimePicker from "./renderTypeLf/DateTimePicker";
import renderTypeInputNumber from "./renderTypeLf/InputNumber";
import renderTypeRate from "./renderTypeLf/Rate.vue";
import renderTypeSlider from "./renderTypeLf/Slider";
import renderTypeTimePicker from "./renderTypeLf/TimePicker";
import renderTypeTimeSelect from "./renderTypeLf/TimeSelect";
import renderTypeUpload from "./renderTypeLf/Upload.vue";

export default renderType;

function renderType(field = {}) {
  const {
    // type: 表单子组件的类型，与elemeng-plus保持一致,可以是以下值：
    // (1)高频表单组件
    //     cascader(√), checkbox(√), checkbox-group(√),
    //     input(√),
    //     radio(×, 这种类型不应该存在,使用radio-group), radio-group(√),
    //     select(√), switch(√),
    //     textarea(√),
    // (2)低频表单组件
    //     color-picker(√),
    //     date-picker(√), datetime-picker(√),
    //     input-number(√),
    //     rate(√),
    //     slider(√),
    //     time-picker(√), time-select(√), transfer(不支持),
    //     upload(√),
    type,

    prop, // 字段名, (对应model中的属性名)

    // typeProps: 可以传递给表单子组件的属性，参考表单组件的API.
    typeProps = {},
  } = field;

  let child = null;
  switch (type) {
    /**
     * 高频表单组件
     */
    case "cascader":
      child = renderTypeCascader.call(this, prop, typeProps);
      break;
    case "checkbox":
      child = renderTypeCheckbox.call(this, prop, typeProps);
      break;
    case "checkbox-group":
      child = renderTypeCheckboxGroup.call(
        this,
        prop,
        typeProps,
        field.options
      );
      break;
    case "input":
      child = renderTypeInput.call(this, prop, typeProps);
      break;
    case "radio-group":
      child = renderTypeRadioGroup.call(this, prop, typeProps, field.options);
      break;
    case "select":
      child = renderTypeSelect.call(this, prop, typeProps, field.options);
      break;
    case "switch":
      child = renderTypeSwitch.call(this, prop, typeProps);
      break;
    case "textarea":
      child = renderTypeTextarea.call(this, prop, typeProps);
      break;
    /**
     * 低频表单组件
     */
    case "color-picker":
      child = renderTypeColorPicker.call(this, prop, typeProps);
      break;
    case "date-picker":
      child = renderTypeDatePicker.call(this, prop, typeProps);
      break;
    case "datetime-picker":
      child = renderTypeDateTimePicker.call(this, prop, typeProps);
      break;
    case "input-number":
      child = renderTypeInputNumber.call(this, prop, typeProps);
      break;
    case "rate":
      child = renderTypeRate.call(this, prop, typeProps);
      break;
    case "slider":
      child = renderTypeSlider.call(this, prop, typeProps);
      break;
    case "time-picker":
      child = renderTypeTimePicker.call(this, prop, typeProps);
      break;
    case "time-select":
      child = renderTypeTimeSelect.call(this, prop, typeProps);
      break;
    case "upload":
      child = renderTypeUpload.call(this, prop, typeProps);
      break;
    default:
      child = null;
  }

  return child;
}
