<template>
<app-header :login="true" />
  <div class="container">

    <div class="login-title">
        <img :src="registerDone" alt="register-done-icon">
        <h3>ثبت نام شما با موفقیت انجام شد</h3>
    </div>
    <div class="button-holder">
        <button  class="submitButton" @click="goToHome()">ورود به سایت</button>
    </div>
  </div>
 
<app-footer/>
</template>

<script>


export default {
    name: 'RegisterDone',
    data(){
        return{
            registerDone: require("@/assets/icons/RegisterDone.svg"),
        }
    },
    methods:{
      goToHome(){
           this.$router.push('/'); 
      }
    }
}
</script>

<style scoped>

.container{
    display: block;
    margin: auto;
      height: 50vh;
    width: 50%;
}
.login-title{
    flex-direction: column;
    display: flex;
    align-items: center;
    margin-top: 10vh;
}
.inputs{
    margin-top: 5vh;
    align-items: center;
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
}
.submitButton{

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
.button-holder{
    margin-top: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
h3{
    margin-top: 2vh;
}
</style>