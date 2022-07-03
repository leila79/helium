<template>
  <app-header />
  <alert v-if="showModal && !isLogin" @close="showModal = false" />
  <div class="container">
    <div class="title-container">
      <img :src="candleIconUrl" alt="" />
      <span>تنظیمات حساب کاربری</span>
    </div>
    <separator v-bind="aboutUserSeparator" />

    <div v-if="aboutInfo.firstName">
      <personal-info v-bind="aboutInfo" />
      <separator />
      <description-info :description="aboutInfo" />
      <separator />
      <contact-info v-bind="aboutInfo" />
      <separator v-bind="followersSeparator" />
      <follower-control />
      <separator v-bind="customazationSeparator" />
      <customazation-control />
    </div>
    <spinner_component v-else />
  </div>
  <!-- {{ aboutInfo }} -->
  <app-footer />
</template>

<script>
import separator from "../components/single/Seperator.vue";
import PersonalInfo from "../components/profile setting/PersonalInfo.vue";
import DescriptionInfo from "../components/profile setting/DescriptionInfo.vue";
import ContactInfo from "../components/profile setting/ContactInfo.vue";
import FollowerControl from "../components/profile setting/FollowersControl.vue"
import CustomazationControl from "../components/profile setting/CustomzationControl.vue"
import isLogin from '../services/utils.js'
import Alert from '../components/Alert.vue'

import { mapState } from 'vuex'
export default {
  name: "ProfileSetting",
  components: {
    separator,
    PersonalInfo,
    DescriptionInfo,
    ContactInfo,
    FollowerControl,
    CustomazationControl,
    Alert
  },
  mounted() {
    console.log(this.isLogin);
    if (this.isLogin && !Object.keys(this.$store.state.aboutInfo).length) {
      console.log("salam az inja");
      this.$store.dispatch("getProfileDetails")
      this.$store.dispatch("getProfilePosts")
      this.$store.dispatch("getProfilFollower")

    }
  },
  created() {
    this.isLogin = isLogin(this.$cookies);
    if (!this.isLogin) {
      this.showModal = true
    }
  },
  computed: {
    ...mapState({
      aboutInfo: 'aboutInfo',
    })
  },

  data() {
    return {
      candleIconUrl: require("@/assets/icons/candle-2.svg"),
      aboutUserSeparator: {
        title: "درباره شما",
        width: "8",
      },
      followersSeparator: {
        title: "دنبال کنندگان",
        width: "12",
      },
      customazationSeparator: {
        title: "شخصی سازی",
        width: "12",
      },
      isLogin: false,
      showModal: false,
    };
  },

};
</script>

<style scoped>
.container {
  position: relative;
  display: block;
  margin: auto;
  height: 100%;
  width: 50%;
}

.title-container {
  margin-top: 5vh;
  display: flex;
  justify-content: flex-start;
}

.title-container span {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1vw;
}
</style>
