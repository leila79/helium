import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./../views/Home.vue";
import SinglePage from "./../views/Single.vue";
import Bookmark from "./../views/Bookmark.vue";
import ProfilePage from "./../views/Profile.vue";
import Register from "./../views/Register.vue";
import Login from "./../views/Login.vue";
import RegisterDone from "./../views/RegisterDone.vue";
import AddNewPost from "./../views/AddNewPost";
import search_component from "./../views/Search.vue";
import ProfileSetting from "./../views/ProfileSetting.vue";
import ForgetPassword from "./../views/ForgetPassword.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/post",
    name: "SinglePage",
    component: SinglePage,
  },
  {
    path: "/bookmarks",
    name: "Bookmark",
    component: Bookmark,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registerDone",
    name: "RegisterDone",
    component: RegisterDone,
  },
  {
    path: "/addPost",
    name: "AddNewPost",
    component: AddNewPost,
  },
  {
    path: "/profileSetting",
    name: "ProfileSetting",
    component: ProfileSetting,
  },
  {
    path: "/search",
    name: "Search",
    component: search_component,
    props: (route) => ({ keyword: route.query.keyword }),
  },
  {
    path: "/forgetPass",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
