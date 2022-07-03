<template>
    <app-header />
    <div class="container">
        <div class="register-title">
            <h3>فراموشی رمز عبور</h3>
            <span v-if="!emailSubmited">لطفا ایمیل خود را وارد کنید</span>
            <span v-if="emailSubmited">رمز عبور جدید خود را وارد کنید</span>
        </div>
        <div v-if="!emailSubmited" class="inputs">
            <Form :validation-schema="simpleSchemaemail" class="form-validation" @submit="submitEmail">
                <div class="inputClass">
                    <span>{{ inputEmail.title }}</span>
                    <Field name="email" type="text" v-model="user.email" :placeholder="inputEmail.placeHolder" />
                    <ErrorMessage name="email" class="error" />
                </div>
                <div class="button-holder">
                    <button class="submitButton" type="submit">تایید</button>
                </div>
            </Form>
        </div>
        <div v-if="emailSubmited" class="inputs">
            <Form :validation-schema="simpleSchemapass" class="form-validation" @submit="changePass">
                <div class="inputClass">
                    <span>{{ inputPassword.title }}</span>
                    <Field name="password" type="password" v-model="user.password"
                        :placeholder="inputPassword.placeHolder" />
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
    <div class="register-route" @click="goToRegister()">حساب ندارید؟ <span> اینجا را کلیک کنید. </span></div>
    <app-footer />
</template>

<script>

import { checkEmail, changePassword } from "../services/auth.js";
import { Field, ErrorMessage, Form } from "vee-validate";
export default {
    name: "ForgetPassword_component",
    components: {
        Field,
        ErrorMessage,
        Form,
    },

    data() {
        const simpleSchemaemail = {
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
            }
        };
        const simpleSchemapass = {
            password(value) {
                if (value?.length < 8) {
                    return "طول رمز عبور باید حداقل 8 کاراکتر باشد";
                }
                if (value && value.trim()) {
                    return true;
                }
                return "این فیلد اجباری میباشد";
            },
        };
        return {
            inputEmail: {
                title: "لطفا ایمیل خود را وارد کنید*",
                placeHolder: "leila.shekofteh@gmail.com",
            },
            inputPassword: {
                title: "لطفا رمزعبور خود را وارد کنید",
                placeHolder: ".......",
                typeInput: "password",
            },
            user: {
                email: "",
                password: "",
            },
            submitted: "",
            errorText: "لطفا همه فیلدها را تکمیل کنید",
            hasError: false,
            emailSubmited: false,
            simpleSchemapass,
            simpleSchemaemail,
        };
    },
    methods: {
        submitEmail() {
            checkEmail(this.user.email).then(
                (response) => {
                    ("response", response.data);
                    if (response.data.statuscode === 200) {
                        this.emailSubmited = true
                    } else {
                        alert("دوباره تلاش کنید")
                    }
                },
                (error) => {
                    ("error in axios", error);
                }
            )
        },
        changePass() {
            changePassword(this.user.email, this.user.password).then(
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
            )
        },
        goToLogin() {
            this.$router.push("/login");
        },
        goToRegister() {
            this.$router.push("/register");
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
