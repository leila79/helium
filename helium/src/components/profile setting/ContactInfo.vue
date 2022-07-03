<template>
  <div class="content">
    <div class="user-name-link">
      <p class="title">نام کاربری و لینک</p>
      <input v-if="editable" type="text" v-model="userUserName" />
      <p v-else class="data">{{ userUserName }}</p>
      <input v-if="editable" type="text" v-model="userWebSite" />
      <p v-else class="data">{{ userWebSite }}</p>
    </div>

    <div class="contact">
      <p class="title">لینک های شما</p>
      <div class="contact-child">
        <img :src="emailIconUrl" alt="" />
        <input v-if="editable" type="text" v-model="userEmail" />
        <span v-else class="contact-text"> {{ userEmail }} </span>
      </div>
      <div class="contact-child">
        <img :src="watssappIconUrl" alt="" />
        <input v-if="editable" type="text" v-model="userWhatsapp" />
        <span v-else class="contact-text"> {{ userWhatsapp }} </span>
      </div>
      <div class="contact-child">
        <img :src="instagramIconUrl" alt="" />
        <input v-if="editable" type="text" v-model="userInstagram" />
        <span v-else class="contact-text"> {{ userInstagram }} </span>
      </div>
    </div>
    <div>
      <icon-holder v-bind="edit" @click="setEditable()" />
    </div>
  </div>
</template>

<script>
import IconHolder from "../IconHolder.vue";
import  { updateContactInfo } from '../../services/user'
export default {
  name: "ContactlInformationEdit",
  components: {
    IconHolder,
  },
  mounted() {
      (this.userUserName = this.userName),
      (this.userWebSite = this.website),
      (this.userInstagram = this.instagram_link),
      (this.userWhatsapp = this.whatsapp_link),
      (this.userEmail = this.email);
  },
  props: {
    userName: {
      required: true,
      type: String,
    },
    website: {
      required: true,
      type: String,
    },
    instagram_link: {
      required: true,
      type: String,
    },
    whatsapp_link: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      edit: {
        iconSrc: require("@/assets/icons/edit.svg"),
      },
      instagramIconUrl: require("@/assets/icons/instagram.svg"),
      watssappIconUrl: require("@/assets/icons/whatsapp.svg"),
      emailIconUrl: require("@/assets/icons/sms.svg"),
      editable: false,
      userUserName: "",
      userWebSite: "",
      userEmail: "",
      userInstagram: "",
      userWhatsapp: "",
      count: 0
    };
  },
  methods: {
    setEditable() {
      this.count++;
      this.editable = !this.editable;
      this.edit.iconSrc = !this.editable
        ? require("@/assets/icons/edit.svg")
        : require("@/assets/icons/tick.png");

      if(this.count === 2 ){
        this.updateProfileContactInfo()
      }
    },
    async updateProfileContactInfo(){
      this.count = 0;
       if(this.userWhatsapp || this.userInstagram || this.userEmail || this.userWebSite || this.userUserName){
        await updateContactInfo(this.$cookies,this.userWhatsapp , this.userInstagram , this.userEmail ,this.userUserName , this.userWebSite)
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
  },
};
</script>

<style scoped>
.content {
  justify-content: space-between;
  width: 100%;
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
}
.contact-child {
  margin-top: 2vh;
  display: flex;
  align-items: center;
}

.contact-text {
  font-size: 0.9rem;
  margin-right: 0.5vw;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: var(--dark-grey-blue);
}

.title {
  font-size: 1rem;
  font-weight: bold;
}

.data {
  margin-top: 2vh;
  font-size: 0.8rem;
  font-weight: normal;
  color: #28394f;
}
.user-name-link input {
  margin-top: 2vh;
}
input {
  display: block;
  width: auto;
  height: auto;
  border-radius: 10px;
  padding: 10px 10px;
  margin-right: 1vw;
  border: 2px solid rgba(19, 158, 202, 0.3);
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
</style>
