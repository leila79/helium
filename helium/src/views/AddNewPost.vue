<template>
  <alert v-if="showModal && !isLogin" @close="showModal = false" />
  <app-header />
  <div class="container">
    <image-holder @imageChoose="setImageAddress($event)" />
  </div>

  <div class="form-input">
    <div class="info-post">
      <add-new-post-info @titleValue="setTitle($event)" @descriptionValue="setDescription($event)"
        @sendTag="setTag($event)" />
    </div>
    <div class="button-holder">
      <button type="submit" class="submitButton" @click="AddPost()">انتشار مطلب</button>
    </div>
  </div>

  <app-footer />
</template>

<script>
import AppHeader from "../components/layouts/AppHeader.vue";
import AppFooter from "../components/layouts/AppFooter.vue";
import ImageHolder from "../components/add post/AddNewPostImageHolder.vue";
import AddNewPostInfo from "../components/add post/AddNewPostInfo.vue";
import { createPost } from "../services/post.js"
import isLogin from '../services/utils.js'
import Alert from '../components/Alert.vue'

export default {
  name: "AddNewPost",
  components: {
    AppHeader,
    AppFooter,
    ImageHolder,
    AddNewPostInfo,
    Alert
  },
  data() {
    return {
      title: '',
      description: '',
      tag: [],
      token: "",
      isLogin: false,
      showModal: false,
      imageAddress: ''
    }
  },
  created() {
    this.isLogin = isLogin(this.$cookies);
    if (!this.isLogin) {
      this.showModal = true
    }

  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    setDescription(event) {
      this.description = event;
      // this.description[1] = event;
      (this.description);
    },
    setTitle(event) {
      this.title = event;
      // this.title[1] = event;
      (this.title);
    },
    setTag(value) {
      this.tag[0] = value;
      ("tag: ", this.tag);
    },
    setImageAddress(value) {
      this.imageAddress = value;
      ("img address: " + this.imageAddress);
    },
    // setSecoundImg(value) {
    //   this.imageAddress[1] = value;
    //   ("img2 address: " + this.imageAddress);
    // },
    AddPost() {
      if (this.title && this.description && this.tag && this.imageAddress) {

        createPost(this.title, this.description, this.imageAddress, this.tag, this.$cookies)
          .then(
            (response) => {
              ("response", response.data);
              if (response.data.statuscode === 200) {
                alert('مقاله با موفقیت ایجاد شد.')
                this.$router.push("/");
              }
              else {
                alert('دوباره تلاش کنید')
              }
            },
            () => {
              alert("دوباره تلاش کنید.")
            }
          );
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: block;
  margin: auto;
  height: 100%;
  width: 50%;
}

.information {

  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 3vh;
  width: 100%;
}

.submitButton {

  cursor: pointer;
  align-items: center;
  width: auto;
  height: auto;
  border-radius: 10px;
  background-color: var(--tealish);
  color: white;
  padding: 10px 55px 10px 55px;
  font-size: 1rem;
  border: none;
  display: flex;
  justify-content: center;
}

.button-holder {
  margin-top: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-post {
  width: 80%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-right: 4.5vw;
  align-content: center;
}

form {
  display: block;
  margin: auto;
  width: 50%;
}

.form-input {
  display: block;
  margin: auto;
  width: 50%;
}
</style>
