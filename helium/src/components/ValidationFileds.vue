<template>
  <div class="inputClass">
    <span> {{ title }} </span>
    <Field :type="inputType" :placeholder="placeHolder" />
    <ErrorMessage name="password" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";

export default {
  name: "validationFields",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    title: {
      required: false,
      type: String,
    },
    placeHolder: {
      type: String,
    },
    typeInput: {
      required: false,
      type: String,
      default: "text",
    },
  },
};
</script>

<style scoped>
input {
  margin-top: 1vh;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid rgba(19, 158, 202, 0.3);
  text-indent: 10px;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
.inputClass {
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
