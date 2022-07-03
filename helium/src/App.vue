<template>
  <router-view />

</template>

<script>

// import isLogin from "./services/utils"
export default {

  name: 'app',
  mounted() {
    // this.isLogin = isLogin(this.$cookies);
    // if(this.isLogin && !Object.keys(this.$store.state.aboutInfo).length ){

    //   this.$store.dispatch("getProfileDetails") 
    //   this.$store.dispatch("getProfilePosts")
    //   this.$store.dispatch("getProfilFollower")
    // }
  },
  data() {
    return {
      currentRoute: window.location.pathname,
      isLogin: false
    }
  },
}
</script>

<style>
</style>