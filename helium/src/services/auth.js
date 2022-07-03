import axios from "axios";

export default function login(_username, _password) {
  return axios.post(`login`, {
    username: _username,
    password: _password,
  });
}

export function logout(cookie) {
  cookie.remove("user");
}

export function register(
  _username,
  _password,
  _first_name,
  _last_name,
  _phone_number,
  _email
) {
  return axios.post(`register/`, {
    username: _username,
    password: _password,
    first_name: _first_name,
    last_name: _last_name,
    phone_number: _phone_number,
    email: _email,
  });
}

export function checkEmail(_email) {
  return axios.post(`checkemail`, {
    email: _email,
  });
}

export function changepass(_email) {
  return axios.post(`changePassword`, {
    password: _password,
  });
}
