<template>
  <app-header :loginPage="true" />
  <div class="container">
    <div class="login-title">
      <h2>ورود/ثبت نام</h2>
    </div>

    <div class="inputs">
      <small class="error" v-if="hasError">{{ errorText }} </small>
      <register-inputs v-bind="inputNumber" v-on:inputValue="setUserName" />
      <register-inputs v-bind="inputPassword" v-on:inputValue="setPassword" />
    </div>
    <div class="button-holder">
      <button class="submitButton" @click="loginRequest()">ادامه</button>
    </div>
  </div>
  <div class="register-route" @click="goToRegister()">حساب ندارید؟ <span> اینجا را کلیک کنید. </span></div>
  <div class="register-route" @click="goToForgetPass()">رمز عبور خود را فراموش کرده اید؟ <span> اینجا را کلیک کنید.
    </span></div>
  <app-footer />
</template>

<script>
import RegisterInputs from "../components/RegisterInput.vue";
import login from "../services/auth.js"

export default {
  name: "login_component",
  components: {
    RegisterInputs,
  },
  data() {
    return {
      inputNumber: {
        title: "لطفا نام کاربری خود را وارد کنید",
        placeHolder: "مثال: leila sh ",
      },
      inputPassword: {
        title: "لطفا رمزعبور خود را وارد کنید",
        placeHolder: ".......",
        typeInput: "password",
      },
      userName: "",
      password: "",
      token: "",
      errorText: "نام کاربری یا رمز عبور اشتباه است! دوباره تلاش کنید.",
      hasError: false,
      countTry: 0,
      isLoading: true,
    };
  },
  methods: {
    setUserName(value) {
      this.userName = value;
    },
    setPassword(value) {
      this.password = value;
    },

    async loginRequest() {
      if (this.userName && this.password) {
        login(this.userName, this.password)
          .then(
            (response) => {
              if (response.data.statuscode === 200) {
                ("response", response.data);
                this.token = response.data.result.token;

                (this.token);
                const userInfo = { name: this.userName, token: this.token };

                this.$cookies.set("user", userInfo);
                this.$router.push("/");
              } else {
                this.hasError = true;
                this.countTry += 1
                if (this.countTry > 2) {
                  this.$router.push("/forgetPass");
                }
              }
            },
            () => {
              alert("دوباره تلاش کنید.")

            }

          );
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goToForgetPass() {
      this.$router.push("/forgetPass");
    },
  },
};
</script>

<style scoped>
.container {
  display: block;
  margin: auto;
  height: 50vh;
  width: 50%;
}

.login-title {
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-top: 10vh;
}

.inputs {
  margin-top: 3vh;
  align-items: center;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
}

.submitButton {
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

.button-holder {
  margin-top: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-route {
  font-size: 1rem;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-route span {
  color: var(--tealish);
}

.register-route span:hover {
  color: var(--tealish);
  cursor: pointer;
  text-decoration: underline;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
