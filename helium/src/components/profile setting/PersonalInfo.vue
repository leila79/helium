<template>
  <div class="personal-info">
    <div class="info-container">

    <input type="file" ref="file" style="display: none" @change="onFileChange($event)"/>
    <div class="frame" v-bind:style="{ backgroundImage: 'url(' + userProfileImage + ')' }">
    <img class="galleryImg" :src="galleryIconUrl" @click="openGallery()" v-if="editable" >
    </div>

      <div class="fullName-holder">
        <div class="fullName">
          <div>
            <p class="title">نام</p>

            <input v-if="editable" type="text" v-model="userFirstName"/>
            <p v-else class="data">{{ userFirstName }}</p>

          </div>
          <div>
            <p class="title">نام خانوادگی</p>
            <input v-if="editable" type="text" v-model="userLastName" />
            <p v-else class="data">{{ userLastName }}</p>
          </div>
        </div>
        <div class="about-user">
          <p class="title">شرح کوتاه</p>
          <input v-if="editable" type="text" v-model="userShortBio" />
          <p v-else class="data">{{ userShortBio }}</p>
        </div>
      </div>
    </div>
    <div>
      <icon-holder v-bind="edit"  @click="setEditable()" />
    </div>
  </div>
</template>

<script>
import IconHolder from "../IconHolder.vue";
import { updatePersonalInfo } from "../../services/user"
export default {
  name: "personalInformationEdit",
  props: {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    shortBio: {
      type: String,
      require: true,
    },
    profileImage:{
      type : String,
      require : true
    }
  },
  components: {
    IconHolder,
  },
  mounted(){

    if(this.profileImage) { 
      this.userProfileImage = this.profileImage
      this.imageAddres = this.profileImage
      }
    this.userFirstName = this.firstName,
    this.userLastName = this.lastName,
    this.userShortBio = this.shortBio
    
  },
  data() {
    return {
      edit: {
        iconSrc: require("@/assets/icons/edit.svg")
      },
      userProfileImage: require("@/assets/img/profiles/defualt-profile.svg"),
      galleryIconUrl : require("@/assets/icons/gallery.svg"),
      editable: false,
      userFirstName : "",
      userLastName : "",
      userShortBio : "",
      imageAddres : "",
      count : 0,
    };
  },
  methods:{
    setEditable(){
      this.editable = !this.editable;
      this.count++;
      this.edit.iconSrc = (!this.editable ? require("@/assets/icons/edit.svg") :require("@/assets/icons/tick.png"));
      if(this.count === 2 ){
        this.updateProfileInfo()
      }
    },
    openGallery() {
      this.$refs.file.click();
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      const baseUrl = "./img/profiles/"
      this.imageAddres = this.$refs.file.value;
      this.imageAddres = baseUrl + ((this.imageAddres.split("fakepath")[1]).replace(/\\/g, ""));
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.userProfileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    updateProfileInfo(){
      this.count = 0;
      if(this.userFirstName && this.userLastName && this.imageAddres && this.userShortBio){
        updatePersonalInfo(this.$cookies,this.userFirstName, this.userLastName,this.userShortBio,this.imageAddres)
        .then(
          (response) => {
           
            if(response.data.statuscode === 200){
              alert("اطلاعات شخصی ویرایش شد.")
              // this.$router.go() 
              this.$store.dispatch("getProfileDetails") 
            }
            else{
               
               alert('دوباره تلاش کنید')
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  },
};
</script>

<style scoped>
.personal-info {
  margin-top: 4vh;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}

.fullName {
  margin-right: 1vw;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.about-user {
  margin-right: 1vw;
}

.title {
  font-size: 1rem;
  font-weight: bold;
}

.data {
  font-size: 0.8rem;
  font-weight: normal;
  margin-top: 1vh;
  color: #28394f;
}
img {
  width: 165px;
  height: 165px;
  border-radius: 50%;
  
}
.fullName-holder {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
input {
  display: block;
  width: 90%;
  height: auto;
  border-radius: 10px;
  padding: 10px 10px;
  margin-top: 1vh;
  border: 2px solid rgba(19, 158, 202, 0.3);
  outline-color:#339cbf;
}

.info-container{
  display: flex;
  width: 80%;
  flex-direction: row;
}
.about-user input{
  width: 100%;
  outline-color:#339cbf;
}

.masked{
  position: relative;
  top: 0;
  left: 0;
}
.img1{
  position: relative;
  z-index: 1;
}
.img2{
  width: 34px;
  height: 34px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0; 
}

.frame {
    position: relative;
    width: 165px;
    height: 165px;
    border-radius: 50%;
    background-position: center;
    background-size: cover; 
}

.galleryImg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    display: block;
    margin: auto; 
    cursor: pointer;
}
</style>
