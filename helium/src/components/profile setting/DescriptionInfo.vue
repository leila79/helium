<template>
  <div class="description">
    <div class="title-holder">
      <p class="title">شرح</p>
         <icon-holder v-bind="edit" @click="setEditable()" />
    </div>
    <input v-if="editable" type="text" v-model="userDescription" maxlength="160" />
    <div v-else class="description-text" > {{ userDescription }} </div>
  </div>
</template>

<script>
import IconHolder from "../IconHolder.vue";
import { updatelongbio } from "../../services/user"
export default {
    name: "descriptionlInformationEdit",
    props:{
        description:{
            require: true,
            type:String
        }
    },
    components:{
        IconHolder
    },
    mounted(){
      this.userDescription = this.description.longBio
    },
    data() {
    return {
      edit: {
        iconSrc: require("@/assets/icons/edit.svg"),
      },
      editable: false,
      userDescription : "",
      count: 0
    };
  },
  methods:{
    setEditable(){
      this.editable = !this.editable;
      this.count++;
      this.edit.iconSrc = (!this.editable ? require("@/assets/icons/edit.svg") :require("@/assets/icons/tick.png"));
      if(this.count === 2){
        this.updateDescription()
      }
    },
    async updateDescription(){
      this.count = 0;
      if(this.userDescription){
        await updatelongbio(this.$cookies,this.userDescription)
        .then(
          (response) => {
            ("response", response.data);
            if(response.data.statuscode === 200){
              alert("اطلاعات شخصی ویرایش شد.")
              // this.$router.go() 
              this.$store.dispatch("getProfileDetails") 
            }
            else{
               alert('دوباره تلاش کنید')
            }
          },
          () => {
             alert('دوباره تلاش کنید')
          }
        );
      }
    }
  }
};
</script>

<style scoped>

.title-holder{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
.title-holder img{
    width: 30px;
    height: 30px;
}
.title{
    font-size: 1rem;
    font-weight: bold;
    
}
.description{
    margin-top: 2vh;
}
.description-text{
    font-weight: normal;
    font-size: 0.9rem;
    width: 70%;
    line-height: 2;
    color: #28394f;
}
input {
  display: block;
  width: 80%;
  height: auto;
  border-radius: 10px;
  padding: 20px 20px;
  margin-top: 1vh;
  border: 2px solid rgba(19, 158, 202, 0.3);
  outline-color:#339cbf;
}

</style>
