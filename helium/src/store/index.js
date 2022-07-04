import { createStore } from "vuex";
import {
  aboutInfoMaker,
  followerMaker,
} from "../components/profile/profile-utils";
import userInfo from "../services/user";
import headerInfoMaker from "../components/profile/profile-utils";
import cookie from "vue-cookies";
import { userFollowers } from "../services/user";
import { userPosts } from "../services/post";
import PostMaker from "../components/post/post-maker.js";

const store = createStore({
  state: {
    aboutInfo: {},
    followersInfo: {},
    postsInfo: {},
    headerInfo: {},
    followerShowMore: false,
    cols: 2,
    showMoreButton: false,
    noPostsAlert: false,
    columns: [],
    // for query requests
    profileInfo: {},
    profileHeaderInfo: {},
    followersQuery: {},
    columns2: [],
    postsQuery: {},
  },
  mutations: {
    PROFILE_INFO(state, res) {
      state.aboutInfo = aboutInfoMaker(res);
      if (state.aboutInfo.profileImage) {
        localStorage.setItem("userpic", state.aboutInfo.profileImage);
      } else {
        localStorage.removeItem("userpic");
      }
      localStorage.setItem("firstname", state.aboutInfo.firstName);
      localStorage.setItem("lastname", state.aboutInfo.lastName);
      state.headerInfo = headerInfoMaker(res);
      console.log("sss", state.aboutInfo);
    },
    PROFILE_ABOUT(state, res) {
      state.profileInfo = aboutInfoMaker(res);
      state.profileHeaderInfo = headerInfoMaker(res);
    },
    PROFILE_POSTS(state, res) {
      console.log(res.length);
      console.log(res);
      if (res.length == 0) state.noPostsAlert = true;
      if (res.length > 3) state.showMoreButton = true;

      state.postsInfo = res.map((post) => PostMaker(post));
    },
    PROFILE_POSTS_QUERY(state, res) {
      console.log(res.length);
      console.log(res);
      if (res.length > 3) state.showMoreButton = true;
      if (res.length == 0) state.noPostsAlert = true;
      state.postsQuery = res.map((post) => PostMaker(post));
    },
    PROFILE_FOLLOWERS(state, res) {
      if (res.length > 4) state.followerShowMore = true;
      state.followersInfo = res.map((follower) => followerMaker(follower));
      const mid = Math.ceil(state.followersInfo.length / state.cols);
      for (let col = 0; col < state.cols; col++) {
        state.columns[col] = JSON.parse(
          JSON.stringify(state.followersInfo.slice(col * mid, col * mid + mid))
        );
      }
    },
    PROFILE_FOLLOWERS_QUERY(state, res) {
      if (res.length > 4) state.followerShowMore = true;
      state.followersQuery = res.map((follower) => followerMaker(follower));

      const mid = Math.ceil(state.followersQuery.length / state.cols);
      for (let col = 0; col < state.cols; col++) {
        state.columns2[col] = JSON.parse(
          JSON.stringify(state.followersQuery.slice(col * mid, col * mid + mid))
        );
      }
    },
  },
  actions: {
    async getProfileDetails(context, _id = -1) {
      await userInfo(cookie, _id)
        .then((res) => {
          // (res);
          if (_id < 0) context.commit("PROFILE_INFO", res.data.result);
          else context.commit("PROFILE_ABOUT", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProfilePosts(context, _id = -1) {
      await userPosts(cookie, _id)
        .then((res) => {
          if (_id < 0) context.commit("PROFILE_POSTS", res.data.result);
          else context.commit("PROFILE_POSTS_QUERY", res.data.result);
        })
        .catch((err) => console.log(err));
    },
    async getProfilFollower(context, _id = -1) {
      await userFollowers(cookie, _id)
        .then((res) => {
          if (_id < 0) context.commit("PROFILE_FOLLOWERS", res.data.result);
          else context.commit("PROFILE_FOLLOWERS_QUERY", res.data.result);
        })
        .catch((err) => console.log(err));
    },
  },
});

export default store;
