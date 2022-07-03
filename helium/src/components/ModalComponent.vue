<template>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="close" ref="close" @click="closeModal()">
        <img :src="xIconUrl" alt="" />
      </div>

      <div>
        <h4>لطفا دسته بندی موضوعی را انتخاب کنید</h4>
      </div>
      <select name="tags" id="tags" class="tags" v-model="selected"  >
        <option value="تکنلوژی">
          تکنلوژی
        </option>
        <option value="نانو تکنولوژی" selected>
          نانو تکنلوژی
        </option>
        <option value="موفقیت">
          موفقیت
        </option>
        <option value="علمی">
          علمی
        </option>
      </select>
      <div class="button-holder">
        <button class="submitButton" @click="closeModal()">تایید</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"ModalComponent",
    props:{
        display:{
            require:false,
            type:Boolean,
            default:true
        }
    },
    watch:{
      selected(newValue){
        this.$emit("selected",newValue);
      }
    },
    data(){
        return{
            xIconUrl : require("@/assets/icons/x.svg"),
            display1 : "",
            selected : ""
        }
    },
    mounted(){
        this.display1 = this.display
    },
    methods:{
    closeModal(){
        this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal {
  display: block; 
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 30%;
  margin-top: 3vh;
  border-radius: 5px;
  box-shadow: 0 4px 10px 0 rgba(40, 57, 79, 0.1);
  border: solid 1px #bae3ef;
  background-color: var(--white);
  width: 30%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.tags {
  padding: 10px;
  border-radius: 10px;
  border: solid 1px rgba(19, 158, 202, 0.3);
  background-color: white;
  height: 20%;
  width: 100%;
}
select {
  border: 0px;
  margin-top: 3vh;
  outline: 0px;
}

.submitButton {
  cursor: pointer;
  align-items: center;
  width: auto;
  height: auto;
  border-radius: 10px;
  background-color: var(--tealish);
  color: white;
  padding: 10px 50px 10px 50px;
  font-size: 1rem;
  border: none;
  display: flex;
  justify-content: center;
}
.button-holder {
  margin-top: 4vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>
