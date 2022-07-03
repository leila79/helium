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
  _phone_number
) {
  return axios.post(`register/`, {
    username: _username,
    password: _password,
    first_name: _first_name,
    last_name: _last_name,
    phone_number: _phone_number,
  });
}

export function checkEmail(_email) {
  return axios.post(`checkEmail`, {
    email: _email,
  });
}

export function changePassword(_email, _password) {
  return axios.post(`changePassword`, {
    email: _email,
    password: _password,
  });
}
