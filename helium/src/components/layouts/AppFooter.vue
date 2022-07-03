<template>
  <footer>
        <div class="wrap">
            <div class="logo">
                <img alt="logo" :src="footerLogoUrl">
            </div>
            <div class="description">
                هلیوم بستری برای اشتراک گذاری ایده ها فکر افراد پیشرو در زمینه علم و دانش است. در
                هلیوم میتوانید به جدیدترین مقالات علمی در کشور دسترسی داشته باشید و خود نیز در ترویج علم
                و دانش نقشی داشته باشید.
            </div>
            <div class="btns">
                <a @click="goToAddNewPost()" >بنویسید</a>
                <a href="#">راهنما</a>
                <a href="#">معرفی به دوستان</a>
                <a href="#">قوانین</a>
            </div>
        </div>
        
    </footer>
</template>

<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            footerLogoUrl: require("@/assets/icons/logo.svg")
        }
    },
    methods:{
        goToAddNewPost(){
            this.$router.push('addPost'); 
        }
    }
}
</script>

<style scoped>
footer{
    width: 100%;
    height: 17vh; 
    margin-top: 15vh;
    background: #232f3d;
    overflow: hidden;
    cursor: pointer;
    border-top-left-radius: 8.5px;
    border-top-right-radius: 8.5px;
    background-image: url('../../assets/img/footerBG.svg') ;
    position: fixed;
    bottom: 0;
}
footer .wrap {
   
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-image: linear-gradient(to left, #232f3d, rgba(35, 47, 61, 0))
}

footer .logo {
    width: 8vw; 
    display: flex;
    justify-content: flex-end; 
    padding: 0 4vw 0 2vw;
}
footer .logo img{
    width: 100%;
    filter: brightness(100);
}
footer .description {
    width: 43vw;
    font-size: 1.05vw;
    font-weight: normal;
    color: #fff;
}
footer .btns {
    width: 30.5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8vw 0 5vw;
}
footer .btns a {
    text-decoration: none;
    color: #fff;
    font-size: 1.15vw;

}
@media(max-width: 1200px) {
    footer .logo{
        padding: 0 5vw 0 3vw;
    }
    footer .logo img{
        width: 100%;
    }
    footer .description {
        font-size: 1.18vw;
    }
}
@media(max-width: 992px) {
    footer {
        height: 10vw;
        margin-top: 5vw;
    }
    footer .logo {
        width: 10vw;
    }
}
@media(max-width: 768px) {
    footer {
        height: 25vw;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }
    footer .wrap {
        flex-wrap: wrap;
        justify-content: center
    }
    footer .logo {
        width: 12vw;
        padding: 0 0 0 3vw;
    }
    footer .description {
        width: 55vw;
        font-size: 1.8vw;
    } 
    footer .btns {
        width: 100%;
        padding: 0;
        justify-content: space-evenly;
    }
    footer .btns a {
        font-size: 1.8vw;
    }
}
@media(max-width: 600px) {
    footer .logo{
        width: 13vw;
        padding: 0 0 0 8vw;
    }
    footer .description {
        width: 60vw;
    }
}
@media(max-width: 400px) {
    footer {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}
</style>