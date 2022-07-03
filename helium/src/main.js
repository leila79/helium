import { createApp } from "vue";
import App from "./App.vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
import appStyle from "@/assets/styles/global.css";
import router from "./router/router.js";
import VueCookies from "vue3-cookies";
import spinner_component from "@/components/Spinner";
import { ValidationProvider } from "vee-validate";
import VeeValidate from "vee-validate";
import store from "./store/index";

const app = createApp(App);

app.component("spinner_component", spinner_component);
app.component("app-header", AppHeader);
app.component("validation-provider", ValidationProvider);
app.component("app-footer", AppFooter);
app.use(VeeValidate, {
  validity: true,
});
app.use(appStyle).use(router).use(VueCookies).use(store);
app.mount("#app");
