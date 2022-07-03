<template>
  <div class="inputClass">
    <span> {{ title }}</span>
    <input :type="typeInput" :placeholder="placeHolder" v-model="value" v-on:keyup="sendData" required/>
  </div>
</template>

<script>
export default {
  name: "RegisterInputs",
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
  data(){
      return{
          value:""
      }
  },
  methods:{
      sendData () {
      this.$emit('inputValue', this.value)
    }
  }
};
</script>

<style scoped>
.inputClass {
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  width: 50%;
}

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
/* ::-webkit-input-placeholder {
  text-align: center;
} */
</style>
