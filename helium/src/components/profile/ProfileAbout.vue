<template>
  <div class="about-content">
    <div class="full-name">
      {{ fullName }}
    </div>
    <div class="long-bio">
        {{ longBio }}
    </div>
    <div class="contact">
      <div class="contact-child">
        <img :src="emailIconUrl" alt="email icon" />
        <span class="email"> {{ email }} </span>
      </div>
      <div class="contact-child">
        <img :src="watssappIconUrl" alt="watspp icon" />
        <span @click="goToWhatsapp()" class="contact-text"> {{ whatsapp_link }} </span>
      </div>
      <div class="contact-child">
        <img :src="instagramIconUrl" alt="instagram icon" />
        <span @click="goToInstagram()" class="contact-text">{{ instagram_link }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAbout",
    props:{
        fullName: {
            required: true,
            type: String
        },
        longBio: {
            required: true,
            type: String
        },
        instagram_link: {
            required: true,
            type: String
        },
        whatsapp_link: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
    },
    data() {
        return { 
            instagramIconUrl: require("@/assets/icons/instagram.svg"),
            watssappIconUrl: require("@/assets/icons/whatsapp.svg"),
            emailIconUrl: require("@/assets/icons/sms.svg"),
        }
        
    },
    methods: {
      goToInstagram(){
        window.open('https://'+ this.instagram, '_blank')
      },
      goToWhatsapp(){
        window.open('https://'+ this.whatsapp, '_blank')
      },
    }


};
</script>

<style scoped>


.about-content {
    margin-top: 5vh;
}

.full-name {
    font-weight: bold;
    font-size: 1rem;
}

.long-bio {
    margin-top: 1vh;
    width: 75%;
    font-weight: normal;
    font-size: 0.9rem;
    line-height: 2;
    letter-spacing: normal;
    text-align: right;
    color: var(--dark-grey-blue);
}

.contact {
    margin-top: 4vh;
}

.contact-child {
    margin-top: 2vh;
    display: flex;
    align-items: center;
}

.contact-text{
    font-size: 0.9rem;
    margin-right: 0.5vw;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: var(--dark-grey-blue);
    cursor: pointer;
}
.email{
  font-size: 0.9rem;
  margin-right: 0.5vw;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: var(--dark-grey-blue);
}
.contact-text:hover{
  color: var(--tealish);
}
</style>
