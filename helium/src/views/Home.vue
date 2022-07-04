<template>

  <app-header />
  <spinner_component v-if="isLoading" />
  <div class="container" v-if="!isLoading">
    <div class="content">
      <post_component v-for="(post, index) in posts" :key="index" v-bind="post" />
    </div>
    <more-button v-if="is_more_posts" @click="getMorePosts()" />
  </div>

  <app-footer />

</template>

<script>

import post_component from '../components/post/Post.vue'
import { getPosts, getPostsLogin } from '../services/post'
import PostMaker from '../components/post/post-maker.js'
import MoreButton from "../components/moreButton.vue"
import isLogin from '../services/utils.js'

export default {
  name: 'HomePage',
  components: {
    post_component,
    MoreButton
  },

  data() {
    return {
      posts: [],
      isLoading: false,
      userInfo: {
        userId: 0,
        userProfilePhoto: require("@/assets/img/profiles/5.jpg"),
      },
      tempPost: [],
      post_start_index: 0,
      isLogin: false,
      is_more_posts: false,
    }
  },
  mounted() {

    if (this.isLogin) {

      this.$store.dispatch("getProfileDetails")
      this.$store.dispatch("getProfilePosts")
      this.$store.dispatch("getProfilFollower")
      console.log("Done")

    }
  },
  methods: {

    async getRecentPosts() {
      this.isLoading = true;
      const response = this.isLogin
        ? await getPostsLogin(this.post_start_index, this.$cookies).then(res => {
          this.isLoading = false
          return res.data.result
        }).catch(err => {
          (err)
          alert("متاسفیم! :( لطفا مجددا وارد صفحه شوید.")
        })

        : await getPosts(this.post_start_index).then(res => {
          this.isLoading = false
          return res.data.result
        })
          .catch(() => {
            alert("متاسفیم دوباره وارد شوید")
          })
      this.post_start_index = response.posts[response.posts.length - 1].id
      this.is_more_posts = response.is_more_posts
      this.posts = response.posts.map(post => (PostMaker(post)))
    },

    async getMorePosts() {
      const response = this.isLogin
        ? await getPostsLogin(this.post_start_index, this.$cookies).then(res => {
          this.isLoading = false
          return res.data.result
        }).catch(() => {
          alert("خطایی رخ داد دوباره تلاش کنید.")
        })

        : await getPosts(this.post_start_index).then(res => {
          this.isLoading = false
          return res.data.result
        })
          .catch(() => {
            alert("متاسفیم دوباره وارد شوید")
          })
      this.post_start_index = response.posts[response.posts.length - 1].id
      this.is_more_posts = response.is_more_posts
      this.tempPost = response.posts.map(post => (PostMaker(post)))
      Array.prototype.push.apply(this.posts, this.tempPost)
    }
  },
  created() {
    this.post_start_index = 0;
    this.isLogin = isLogin(this.$cookies)
    this.getRecentPosts()
  },

}
</script>

<style scoped>
.container {
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  padding: 3vw 0;
}

.sidebar {
  width: 14vw;
  height: 100%;
  background-color: red;
}

.container .content {
  width: 72vw;
  height: 100%;
  margin: auto;
}

@media(max-width: 1200px) {
  .sidebar {
    width: 10vw;
  }

  .container .content {
    width: 80vw;
  }
}

@media(max-width: 992px) {
  .container .content {
    width: 80vw;
  }
}

@media(max-width: 768px) {
  .sidebar {
    width: 15vw;
  }

  .container .content {
    width: 70vw;
  }
}

@media(max-width: 600px) {
  .sidebar {
    width: 9vw;
  }

  .container .content {
    width: 86vw;
  }
}
</style>
