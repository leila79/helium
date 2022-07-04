<template>
  <app-header />

  <div class="container" v-if="!isLoading">
    <profile-header v-bind="!hasQuery ? headerInfo : profileHeaderInfo" :isUserProfile="isUserProfile" />

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

      <div v-if="aboutInfo.firstName || profileInfo.firstName">
        <div class="content">
          <div v-if="currentTab == 'tab1'">
            <profile-about v-bind="!hasQuery ? aboutInfo : profileInfo" />
          </div>

          <div v-if="currentTab == 'tab2'">

            <div v-if="checkPost()" class="no-post-alert">تا کنون مقاله ای منتشر نشده است.</div>
            <div v-else>
              <div v-if="!hasQuery">
                <div v-for="(item, index) in postsInfo" :key="index">
                  <profile-posts v-bind="item" v-if="index + 1 <= postShow" />
                </div>
              </div>
              <div v-else-if="postsQuery.length">
                <div v-for="(item, index) in postsQuery" :key="index">
                  <profile-posts v-bind="item" v-if="index + 1 <= postShow" />
                </div>
              </div>
            </div>
            <more-button v-if="showMoreButton" @click="postShow += 3" />

          </div>

          <div v-if="currentTab == 'tab3'">
            <div class="followers-container">
              <div v-if="!hasQuery">
                <div class="followers" v-for="(column, index) in columns" :key="index">
                  <div v-if="(index + 1) * column.length <= followerShow" class="item-container">
                    <profile-follower v-bind="item" v-for="item in column" :key="item.id" />
                  </div>
                </div>
              </div>
              <div v-else-if="columns2.length">
                <div class="followers" v-for="(column, index) in columns2" :key="index">
                  <div v-if="(index + 1) * column.length <= followerShow" class="item-container">
                    <profile-follower v-bind="item" v-for="item in column" :key="item.id" />
                  </div>
                </div>
              </div>
            </div>
            <more-button v-if="followerShowMore" @click="followerShow += 2" />
          </div>
        </div>
      </div>
      <spinner_component v-else />
    </div>
  </div>
  <app-footer />
</template>

<script>

import ProfileHeader from "../components/profile/ProfileHeader.vue"
import ProfileAbout from "../components/profile/ProfileAbout.vue"
import ProfileFollower from "../components/profile/ProfileFollowers.vue"
import ProfilePosts from "../components/profile/ProfilePosts.vue"
import MoreButton from "../components/moreButton.vue"
import { mapState } from 'vuex'

export default {
  name: "ProfilePage",
  components: {
    ProfileHeader,
    ProfileAbout,
    ProfileFollower,
    ProfilePosts,
    MoreButton,
  },

  data() {
    return {
      tabs: [
        { title: "درباره", value: "درباره" },
        { title: "مقالات", value: "مقالات" },
        { title: "دنبال کننده ها", value: "دنبال کننده ها" },
      ],
      currentTab: "tab1",
      userId: 2,
      tab1: true,
      isUserProfile: false,
      followerShow: 2,
      postShow: 3,
      hasQuery: false,
      isLoading: false,
      isLogin: true
      // noPostAlert: false,

    };
  },

  mounted() {
    // console.log(this.$route.query.userId);
    if (this.$route.query.userId) {
      // console.log("salam2");
      this.isUserProfile = false
      // this.isLoading = true
      this.$store.dispatch("getProfileDetails", this.$route.query.userId)
      this.$store.dispatch("getProfilFollower", this.$route.query.userId)
      this.$store.dispatch("getProfilePosts", this.$route.query.userId)
      this.hasQuery = true
      this.isLoading = false

    }
    else {
      // console.log(this.isLogin);
      this.isUserProfile = true
      this.hasQuery = false
      this.isLoading = false
      // console.log(Object.keys(this.$store.state.aboutInfo).length)
      if (this.isLogin && !Object.keys(this.$store.state.aboutInfo).length) {

        this.$store.dispatch("getProfileDetails")
        console.log(this.aboutInfo);
        this.$store.dispatch("getProfilePosts")
        this.$store.dispatch("getProfilFollower")
        this.isLoading = false
      }
      this.isLoading = false
      this.hasQuery = false
    }
    // console.log(this.isLoading)
  },
  computed: {
    ...mapState({
      aboutInfo: 'aboutInfo',
      headerInfo: 'headerInfo',
      postsInfo: 'postsInfo',
      followersInfo: 'followersInfo',
      columns: 'columns',
      followerShowMore: 'followerShowMore',
      showMoreButton: 'showMoreButton',
      noPostsAlert: 'noPostsAlert',
      profileInfo: 'profileInfo',
      profileHeaderInfo: 'profileHeaderInfo',
      columns2: 'columns2',
      postsQuery: 'postsQuery',
      isLoading: 'isLoading'
    }),
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    checkPost() {
      console.log(this.noPostsAlert)
      this.$store.dispatch("getProfilePosts", this.aboutInfo.userId)
      console.log(this.noPostsAlert)
      return this.noPostsAlert
    }
  },

};
</script>

<style scoped>
.container {
  margin: auto;
  height: 100%;
  width: 71vw;
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
  margin-bottom: 5vw;
}

.tabs {
  position: relative;
  margin: 0 auto;
  margin-top: 8vh;
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

.followers-container {
  flex-direction: column;
  display: flex;
}

.followers {
  margin-top: 2vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.item-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.no-post-alert {
  margin: 3vw 5px 1vw 5px;
  color: var(--dark-grey-blue);
}

@media (max-width: 1200px) {
  .container {
    width: 70%;
  }
}

@media (max-width: 992px) {
  .container {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .container {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .container {
    width: 85%;
  }
}
</style>
