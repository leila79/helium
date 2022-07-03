const axios = require("axios")
// import baseUrl from "./api.js"

function login(_username, _password) {
   axios
    .post('http://127.0.0.1:5000/login', {
        username: this._username,
        password: this._password,
    }).then(res => {
        console.log(res.data)
    })
}

login("pariya_ab", "123456")