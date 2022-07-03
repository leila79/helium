<template>
  <app-header />
  <div class="container">
    <div class="register-title">
      <h3>شما هنوز در هلیوم ثبت نام نکرده اید</h3>
      <span>لطفا اطلاعات زیر را برای ثبت نام تکمیل کنید</span>
    </div>
    <div class="inputs">
      <Form :validation-schema="simpleSchema" class="form-validation" @submit="signup">

        <div class="inputClass">
          <span>{{ inputName.title }}</span>
          <Field name="name" type="text" v-model="user.firstName" :placeholder="inputName.placeHolder" />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="inputClass">
          <span>{{ inputFamily.title }}</span>
          <Field name="family" type="text" v-model="user.lastName" :placeholder="inputFamily.placeHolder" />
          <ErrorMessage name="family" class="error" />
        </div>

        <div class="inputClass">
          <span>{{ inputEmail.title }}</span>
          <Field name="email" type="text" v-model="user.email" :placeholder="inputEmail.placeHolder" />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="inputClass">
          <span>{{ inputNumber.title }}</span>
          <Field name="phone" type="text" v-model="user.phoneNumber" :placeholder="inputNumber.placeHolder" />
          <ErrorMessage name="phone" class="error" />
        </div>
        <div class="inputClass">
          <span>{{ inputUserName.title }}</span>
          <Field name="username" type="text" v-model="user.userName" :placeholder="inputUserName.placeHolder" />
          <ErrorMessage name="username" class="error" />
        </div>

        <div class="inputClass">
          <span>{{ inputPassword.title }}</span>
          <Field name="password" type="password" v-model="user.password" :placeholder="inputPassword.placeHolder" />
          <ErrorMessage name="password" class="error" />
        </div>

        <div class="button-holder">
          <button class="submitButton" type="submit">تایید</button>
        </div>
      </Form>
    </div>
  </div>
  <div class="register-route" @click="goToLogin()">
    حساب دارید؟ <span> از اینجاوارد شوید. </span>
  </div>
  <app-footer />
</template>

<script>

import { register } from "../services/auth.js";
import { Field, ErrorMessage, Form } from "vee-validate";
export default {
  name: "register_component",
  components: {
    Field,
    ErrorMessage,
    // RegisterInputs,
    Form,
    // validationFields,
  },

  data() {
    const simpleSchema = {
      password(value) {
        if (value?.length < 8) {
          return "طول رمز عبور باید حداقل 8 کاراکتر باشد";
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
      username(value) {
        if (value?.length < 4) {
          return "نام کاربری باید حداقل 4 کاراکتر باشد";
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
      name(value) {
        let hasNumber = /\d/;
        if (hasNumber.test(value)) {
          return "نام صحیح وارد کنید";
        }
        if (value?.length < 3) {
          return "حداقل 3 کاراکتر اجباری است.";
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
      family(value) {
        const hasNumber = /\d/;
        if (hasNumber.test(value)) {
          return "نام خانوادگی صحیح وارد کنید";
        }
        if (value?.length < 4) {
          return "حداقل 4 کاراکتر اجباری است.";
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
      email(value) {

        if (!value.match(/\S+@\S+\.\S+/)) {
          return 'لطفا ایمیل صحیح وارد کنید';
        }
        if (value.indexOf(' ') != -1 || value.indexOf('..') != -1) {
          return 'لطفا ایمیل صحیح وارد کنید';
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
      phone(value) {
        const phoneno = /^\d{11}$/;
        if (!value.match(phoneno)) {
          return "شماره تلفن صحیح نیست"
        }
        if (value && value.trim()) {
          return true;
        }
        return "این فیلد اجباری میباشد";
      },
    };
    return {
      inputNumber: {
        title: "شماره تلفن همراه شما*",
        placeHolder: "09152500535",
      },
      inputName: {
        title: "لطفا نام خود را وارد کنید*",
        placeHolder: "نام خود را به فارسی وارد کنید ",
      },
      inputFamily: {
        title: "لطفا نام خانوادگی خود را وارد کنید*",
        placeHolder: "نام خانوادگی خود را به فارسی وارد کنید",
      },
      inputEmail: {
        title: "لطفا ایمیل خود را وارد کنید*",
        placeHolder: "leila.shekofteh@gmail.com",
      },
      inputUserName: {
        title: "نام کاربری دلخواه خود را وارد کنید*",
        placeHolder: "نام کاربری را به انگلیسی وارد کنید",
      },
      inputPassword: {
        title: "لطفا رمزعبور خود را وارد کنید",
        placeHolder: ".......",
        typeInput: "password",
      },
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName: "",
        phoneNumber: "",
      },
      submitted: "",
      errorText: "لطفا همه فیلدها را تکمیل کنید",
      hasError: false,
      simpleSchema,
    };
  },
  methods: {
    signup() {
      ("username: " + this.user.userName + " " + "password: " + this.user.password);
      ("firstname: " + this.user.firstName + " " + "lastname: " + this.user.lastName);
      ("phonenumber: " + this.user.phoneNumber);

      register(this.user.userName, this.user.password, this.user.firstName, this.user.lastName, this.user.phoneNumber.toString())
        .then(
          (response) => {
            ("response", response.data);
            if (response.data.statuscode === 200) {
              this.$router.push('/login');
            } else {
              alert("دوباره تلاش کنید")
            }
          },
          (error) => {
            ("error in axios", error);
          }
        );
    },
    goToLogin() {
      this.$router.push("/login");
    },
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return "This is required";
    },
  },
};
</script>

<style scoped>
.container {
  display: block;
  margin: auto;
  width: 50%;
}

.register-title {
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-top: 10vh;
}

.register-title span {
  padding: 10px;
  font-size: 1.2rem;
  font-weight: normal;
  opacity: 0.8;
}

.inputs {
  margin-top: 3vh;
  align-items: center;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
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

.error {
  color: red;
  font-size: 1rem;
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

.form-validation {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 50%;
}

input {
  margin-top: 1vh;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid rgba(19, 158, 202, 0.3);
  text-indent: 10px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.inputClass {
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
