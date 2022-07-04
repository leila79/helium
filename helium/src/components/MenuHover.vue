<template>
  <div class="menu-container">
    <div class="menu">
      <div class="name-and-link" @click="goToProfile()">
        <span> {{ fullName }}</span>
        <span>{{ email }}</span>
      </div>
      <hr />
      <div class="actions" @click="goToAddNewPost()">
        <img :src="addNewPostIconUrl" alt="" />
        <span> ایجاد مقاله</span>
      </div>
      <hr />
      <div class="actions" @click="goToProfileSetting()">
        <img :src="profileSettingIconUrl" alt="" />
        <span> تنظیمات حساب کاربری</span>
      </div>
      <hr />
      <div class="actions" @click="goToLogin()">
        <img :src="logoutIconUrl" alt="" />
        <span> خروج از حساب کاربری</span>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '../services/auth'

export default {
  name: "MenoHover",
  data() {
    return {
      addNewPostIconUrl: require("@/assets/icons/document-download.svg"),
      profileSettingIconUrl: require("@/assets/icons/candle-2.svg"),
      logoutIconUrl: require("@/assets/icons/logout.svg"),
      fullName: "",
      email: ""
    };
  },
  mounted() {
    this.fullName = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname')
    this.email = localStorage.getItem('email')
  },
  methods: {
    goToAddNewPost() {
      this.$router.push('addPost');
    },
    goToLogin() {
      logout(this.$cookies)
      this.$router.push("/login");
    },
    goToProfileSetting() {
      this.$router.push("/profileSetting");
    },
    goToProfile() {
      if (this.$route.name === "ProfilePage") {

        this.$router.replace({ 'query': null });
        //  this.$router.push("/")
        this.$router.push("/profile")
      }
      else {
        this.$router.push("/profile")
      }
    }
  }
};
</script>

<style scoped>
.name-and-link {
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #28394f;
  font-size: 1rem;
}

.name-and-link :nth-child(2) {
  opacity: 0.5;
  color: #28394f;
}

.actions {
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  padding: 10px 0;
  flex-direction: row;
  justify-content: flex-start;
}

.actions span {
  font-size: 0.8rem;
  margin-right: 1vw;
  color: #28394f;
}

.actions img {
  width: 24px;
  height: 24px;
  margin-right: 1vw;
}

.menu-container {

  position: fixed;
  width: 50%;
  height: 750px;

}

.menu-container .menu {
  position: absolute;
  cursor: pointer;
  margin-top: 1.5vh;
  right: -9%;
  background-color: rgb(255, 255, 255);
  width: 200px;
  height: 30%;
  border-radius: 15px;
  transition: 0.5s;
}

.menu ::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 90px;
  width: 20px;
  height: 20px;
  background-color: rgb(255, 255, 255);
  transform: rotate(45deg);
}

hr {
  opacity: 0.1;
  width: 100%;
}

.actions:hover {
  background-color: #eef2f3;
}
</style>
