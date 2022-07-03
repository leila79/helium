<template>
  <header class="appHeader">
    <div @click="goToHome()">
      <img class="logo" alt="logoUrl" :src="logoUrl" />
    </div>
    <div>
      <button v-if="!login && !loginPage" class="register-btn" @click="goToLogin()"> ورود / ثبت نام </button>
      <div class="header-icons" v-else-if="login && !loginPage">
        <div class="search-icon">
            <search-box v-show="search" /> 
            <img :src="searchIconUrl" alt="search-icon"  @click="search = !search"/>
        </div>
        <img :src="saveIconUrl" alt="save-icon" @click="goToBookmark()" />
        <img :src="notificationIconUrl" alt="notification-icon" />
        <div class="hoverImg"  @mouseover="hover = true" @mouseleave="hover = false">
          <img
            :src="userProfilePhoto"
            alt="profile-img"
            class="profile-img"
            @click="goToProfile()"
          />
          <menu-hover  v-show="hover"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import MenuHover from "../MenuHover.vue"
import SearchBox from "../search/SearchBox.vue"
import isLogin from "../../services/utils"
import { mapState } from 'vuex'

export default {
  name: "AppHeader",
  components:{
      MenuHover,
      SearchBox
  },
  props: {
    headerType: {
      required: false,
      type: String,
    },
    loginPage:{
      required: false,
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      login: false,
      logoUrl: require("@/assets/icons/logo.svg"),
      searchIconUrl: require("@/assets/icons/search-normal.svg"),
      saveIconUrl: require("@/assets/icons/save-2.svg"),
      notificationIconUrl: require("@/assets/icons/notification.svg"),
      userProfilePhoto: require("@/assets/img/profiles/defualt-profile.svg"),
      hover: false,
      search: false,
    };
  },
  computed:{ ...mapState({
    aboutInfo: 'aboutInfo',
  })},
  methods: {
    goToProfile() {
      this.$router.push("/profile");
    },
    goToBookmark() {
      this.$router.push("/bookmarks");
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToHome(){
      this.$router.push("/");
    },
    checkLogin(){
      this.login = isLogin(this.$cookies)
      if(this.login === true) this.profileInfo()
    },
    profileInfo(){
      (localStorage.getItem('userpic'));
      if(localStorage.getItem('userpic')){
        this.userProfilePhoto = localStorage.getItem('userpic')
     }
    }
  },
  created(){
    this.checkLogin()  
  }
};
</script>

<style scoped>
.appHeader {
  width: auto;
  height: 45px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
  background-color: var(--white);
  margin: 0 0 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 14vw;
}

.logo {
  width: 9vw;
  vertical-align: middle;
  justify-self: start;
  cursor: pointer;
}

.search-icon{
 
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center ;
}

/*Login-Register Button*/
.register-btn {
  width: 10.5vw;
  height: 35px;
  border-radius: 10px;
  background-color: var(--tealish);
  border: none;
  font-size: 1.05vw;
  font-family: "bahij-helvetica-light";
  font-weight: bold;
  color: #fff;
}

.header-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-icons img {
  margin: 0 0.7vw;
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.header-icons .profile-img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  vertical-align: middle;
}
button{
  cursor: pointer;
}
@media (max-width: 1200px) {
  .appHeader {
    padding: 2vh 10vw;
    margin: 0 0 12vh;
  }
  header .logo {
    width: 11vw;
  }
  .register-btn {
    height: 33px;
    width: 13vw;
    font-size: 1.25vw;
    border-radius: 9px;
  }
}
@media (max-width: 992px) {
  header {
    margin: 0 0 8vh;
  }

  header .logo {
    width: 12.3vw;
  }
  .register-btn {
    height: 30px;
    width: 15vw;
    font-size: 1.45vw;
    border-radius: 8px;
  }
}
@media (max-width: 768px) {
  header {
    margin: 0 0 7vw;
    padding: 2vh 15vw;
    height: 55px;
  }

  header .logo {
    width: 14.5vw;
  }
  .register-btn {
    height: 26px;
    width: 16vw;
    font-size: 1.6vw;
    border-radius: 7px;
  }
}
@media (max-width: 600px) {
  header {
    margin: 0 0 8vw;
    padding: 1vh 9vw;
    height: 50px;
  }
  header .logo {
    width: 18vw;
  }
  .register-btn {
    height: 25px;
    width: 21vw;
    font-size: 2.2vw;
    border-radius: 6px;
  }
}
@media (max-width: 400px) {
  header {
    margin: 0 0 7vw;
  }
  header .logo {
    width: 23vw;
  }
  .register-btn {
    height: 25px;
    width: 24vw;
    font-size: 2.8vw;
  }
}
</style>