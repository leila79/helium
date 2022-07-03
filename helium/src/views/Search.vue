<template>
  <app-header />
  <spinner_component v-if="isLoading" />
  <div class="container" v-if="!isLoading">
    <div class="search-input">
      <label for="search-result-input">نتایج برای</label>
      <input type="text" name="search-result-input" id="search-input" class="input-show-result" v-model="searchWord" />
    </div>
    <div class="tab-bar">
      <nav class="tabs">
        <button class="tabs__item" v-bind:class="{ 'tabs__item_active , tabs__item': tab1 }"
          v-on:click="currentTab = 'tab1'">
          {{ tabs[0].title }}
        </button>
        <button class="tabs__item" v-on:click="(currentTab = 'tab2'), (tab1 = false)">
          {{ tabs[1].title }}
        </button>
        <button class="tabs__item" v-on:click="(currentTab = 'tab3'), (tab1 = false)">
          {{ tabs[2].title }}
        </button>
        <div class="line"></div>
        <div class="tabs__active-line"></div>
      </nav>
    </div>

    <div class="content">
      <div v-if="currentTab == 'tab1'">
        <div v-if="noPostResult" class="no-post">هیچ پستی برای نتیجه ی این جست و جو وجود ندارد.</div>
        <post_component v-for="(post, index) in posts" :key="index" v-bind="post" :book-marked="true" />
      </div>
      <div v-if="currentTab == 'tab2'">
        <div v-if="noUserResult" class="no-user">هیچ کاربری برای نتیجه ی این جست و جو وجود ندارد.</div>
        <search-peoples v-for="(people, index) in peoples" :key="index" v-bind="people" />
      </div>
      <div v-if="currentTab == 'tab3'" class="tagHolder">
        <div v-if="noTagResult" class="no-post">هیچ موضوعی برای نتیجه ی این جست و جو وجود ندارد.</div>
        <search-tag v-for="(tag, index) in tags" :key="index" :tag="tag" />
      </div>
    </div>
  </div>

  <app-footer />
</template>

<script>

import SearchPeoples from "../components/search/SearchPeoples.vue";
import post_component from "../components/post/Post.vue"
import SearchTag from "../components/search/SearchTag.vue"
import searchUsers, { searchPosts, searchTags } from "../services/search.js"
import PostMaker from '../components/post/post-maker';
import UserMaker from '../components/search/search-maker.js'

export default {
  name: "search_component",
  props: {
    keyword: String,
  },
  components: {
    SearchPeoples,
    post_component,
    SearchTag
  },
  mounted() {
    this.searchWord = this.keyword;
    this.getPosts()
    this.getUsers()
    this.getTags()
  },
  data() {
    return {
      tabs: [
        { title: "مقالات", value: "مقالات" },
        { title: "افراد", value: "افراد" },
        { title: "موضوعات", value: "موضوعات" },
      ],

      currentTab: "tab1",
      searchWord: "",
      tab1: true,
      posts: [],
      peoples: [],
      tags: [],
      isLoading: false,
      noPostResult: false,
      noUserResult: false,
      noTagResult: false,
    };
  },
  methods: {
    async getPosts() {
      this.isLoading = true;
      const response = await searchPosts(this.$cookies, this.keyword)
        .then(res => { return res.data.result })
        .catch(err => (err))
        .finally(() => (this.isLoading = false))

      if (response.length == 0) {
        this.noPostResult = true
        return
      }
      this.noPostResult = false
      this.posts = response.map(post => (PostMaker(post)))
    },

    async getUsers() {
      this.isLoading = true;
      const response = await searchUsers(this.$cookies, this.keyword)
        .then(res => { return res.data.result })
        .catch(err => (err))
        .finally(() => (this.isLoading = false))

      if (response.length == 0) {
        this.noUserResult = true
        return
      }
      this.noUserResult = false
      this.peoples = response.map(person => (UserMaker(person)))
    },

    async getTags() {
      this.isLoading = true;
      const response = await searchTags(this.$cookies, this.keyword)
        .then(res => { return res.data.result })
        .catch(err => (err))
        .finally(() => (this.isLoading = false))

      if (response.length == 0) {
        this.noTagResult = true
        return
      }
      this.noTagResult = false
      this.tags = response.map((tag) => (tag.title))
    },
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  height: 100%;
  width: 55%;
}

.search-input {
  width: 59vw;
  margin-top: 5vh;
}

.input-show-result {
  margin-right: 1vw;
  background-color: transparent;
  outline: 0;
  border-width: 0 0 2px;
  border-color: var(--tealish);
  width: 85%;
  font-size: 1.5rem;
  font-weight: bold;
}

.tab-bar {
  margin-top: 12vh;
}

.line {
  position: relative;
  margin-top: -0.1vh;
  width: 100%;
  height: 2px;
  background-color: rgba(19, 158, 202, 0.3);
}

.content {
  margin-top: 2vh;
}

.tagHolder {
  margin-top: 3vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
}

.tabs {
  position: relative;
  margin: 0 auto;
  margin-top: 8vh;
}

.no-post,
.no-user,
.no-tag {
  color: var(--dark-grey-blue)
}

.tabs__item {
  display: inline-block;
  margin: 0 5px;
  padding: 10px;
  padding-bottom: 8px;
  font-size: 16px;
  letter-spacing: 0.8px;
  color: gray;
  text-decoration: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s;
}

.tabs__item_active {
  color: var(--tealish);
  border-bottom: 2px solid var(--tealish);
}

.tabs__item:hover {
  border-bottom: 2px solid var(--tealish);
  color: var(--tealish);
}

.tabs__item:focus {
  outline: none;
  border-bottom: 2px solid var(--tealish);
  color: var(--tealish);
}

.tabs__item:first-child {
  margin-left: 0;
}

.tabs__item:last-child {
  margin-right: 0;
}

.tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--tealish);
  transition: transform 0.4s ease, width 0.4s ease;
}
</style>
