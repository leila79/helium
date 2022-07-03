<template>
  <spinner_component v-if="isLoading" />
  <app-header />

  <div class="container" v-if="!isLoading">
    <article-post v-bind="post" />

    <seperator v-if="more_posts.length > 0" title="از همین نویسنده" :width="16" />

    <div class="more-post-container">
      <relative-post v-for="(more_post, index) in more_posts" :key="index" v-bind="more_post" />
    </div>

    <seperator v-if="this.post_comments.length > 0" title="نظرات" :width="16" />

    <comment v-for="(comment, index) in post_comments" :key="index" v-bind="comment" />

    <p class="comment-hint" v-if="!this.isLogin">لطفا برای ثبت نظر ابتدا وارد حساب کاربری خود شوید و یا حساب کاربری جدید
      ایجاد کنید.</p>
    <div class="ticket">
      <div class="first-row">
        <app-input title="نام" :isRequired=true _class="name-input" _name="name" mainClass="name-box"
          :defaultValue="firstName" :Disabled="!isLogin" />

        <app-input title="نام خانوادگی" :isRequired=true _class="last-name-input" _name="last-name"
          mainClass="last-name-box" :defaultValue="lastName" :Disabled="!isLogin" />

        <app-input title="ایمیل" :isRequired=true _class="email-input" _name="email" mainClass="email-box"
          :defaultValue="email" :Disabled="!isLogin" />
      </div>

      <app-text-area title="نظر دادن" :isRequired="true" class="second-row" _class="comment-input" _name="comment"
        @childToParent="setComment($event)" :Disabled="!isLogin" />
      <button :class="{ 'comment-submit-btn': isLogin, 'comment-submit-btn-disabled': !isLogin }" :disabled="!isLogin"
        @click="sendComment()">
        ثبت نظر
      </button>
    </div>
  </div>
  <app-footer />
</template>

<script>
import ArticlePost from '../components/post/ArticlePost.vue'
import Seperator from '../components/single/Seperator.vue'
import RelativePost from '../components/post/RelativePost.vue'
import Comment from '../components/single/Comment.vue'
import AppInput from '../components/AppInput.vue'
import AppTextArea from '../components/AppTextArea.vue'
import { getPostDetails, getPostDetailsLogin, getPostComments, addPostComment } from '../services/post'
import { ArticlePostMaker, relativePostMaker } from '../components/post/post-maker'
import isLogin from '../services/utils.js'
import userInfo from '../services/user'

export default {
  name: 'SinglePage',
  components: {
    ArticlePost,
    RelativePost,
    Seperator,
    Comment,
    AppInput,
    AppTextArea,
  },

  data() {
    return {
      post: {},
      post_comments: [],
      more_posts: [],
      isLoading: false,
      isLogin: false,
      firstName: '',
      lastName: '',
      email: '',
      commentText: ""
    }
  },
  methods: {
    async loadPostDetails(post_id) {
      this.isLoading = true
      if (this.isLogin) {
        getPostDetailsLogin(post_id, this.$cookies)
          .then(res => {
            console.log(res.data.result);
            return res.data.result
          })
          .then(details => {
            this.post = ArticlePostMaker(details)

            getPostComments(post_id)
              .then(res => { this.post_comments = res.data.result })

            this.more_posts = details.more_posts.map(post => (relativePostMaker(post)));
            this.isLoading = false;
          })
          .catch(err => {
            alert("متاسفیم :( لطفا مجددا وارد صفحه شوید.")
            console.log(err)
          })
      } else {
        getPostDetails(post_id)
          .then(res => {
            console.log(res.data.result);
            return res.data.result
          })
          .then(details => {
            this.post = ArticlePostMaker(details)

            getPostComments(post_id)
              .then(res => { this.post_comments = res.data.result })

            this.more_posts = details.more_posts.map(post => (relativePostMaker(post)));
            this.isLoading = false;
          })
          .catch(err => {
            alert("متاسفیم :( لطفا مجددا وارد صفحه شوید.")
            console.log(err)
          })
      }
    },
    profileInfo() {
      userInfo(this.$cookies)
        .then(res => { return res.data.result })
        .then(data => {
          this.firstName = data.first_name
          this.lastName = data.last_name
          this.email = data.email
        })
    },
    checkLogin() {
      if (this.isLogin)
        this.profileInfo()
    },
    setComment(value) {
      this.commentText = value;
    },
    sendComment() {

      if (this.commentText) {
        addPostComment(this.$cookies, this.$route.query.postId, this.commentText).then(
          response => {
            if (response.data.statuscode === 200) {
              alert("کامنت با موفقیت ثبت شد")
              getPostComments(this.$route.query.postId).then(res => { this.post_comments = res.data.result })
            } else {
              this.hasError = true;
              ("error in axios", response.data.status);
            }
          },
          (error) => {
            ("error in axios", error);
          }
        );
      } else {
        alert("شما اجازه ی ارسال کامنت خالی ندارید.")
      }
    }
  },
  created() {
    this.isLogin = isLogin(this.$cookies)
    this.checkLogin()
    this.loadPostDetails(this.$route.query.postId)
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 55%;
  margin: auto;
  padding: 3vw 0;
}

.more-post-container {
  margin-top: 2.5vw;
}

.ticket {
  margin-top: 7%;
}

.first-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.second-row {
  margin: 1vw 0 2vw 0;
}

.name-box,
.last-name-box {
  width: 20%;
}

.email-box {
  width: 30%;
}

.comment-hint {
  color: var(--tealish);
  font-size: 1rem;
  width: 100%;
  margin-top: 2vw;
}

.comment-submit-btn {
  width: 10.5vw;
  height: 35px;
  border-radius: 10px;
  background-color: var(--tealish);
  border: none;
  font-size: 1.05vw;
  font-family: "bahij-helvetica-light";
  font-weight: bold;
  color: #fff;
  position: relative;
  left: 0;
  cursor: pointer;
}

.comment-submit-btn-disabled {
  width: 10.5vw;
  height: 35px;
  border-radius: 8px;
  background-color: #61c2bd98;
  border: none;
  font-size: 1.05vw;
  font-family: "bahij-helvetica-light";
  font-weight: bold;
  color: #fff;
  position: relative;
  left: 0;
  cursor: pointer;
}

@media(max-width: 1200px) {
  .container {
    width: 60%;
  }
}

@media(max-width: 768px) {
  .container {
    width: 80%;
  }
}

@media(max-width: 600px) {
  .container {
    width: 85%;
  }

}

@media(max-width: 600px) {
  .container {
    width: 85%;
  }
}
</style>