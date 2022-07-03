import axios from "axios";
import { getToken } from "./utils";

export default function userInfo(cookies, user_id = -1) {
  if (user_id < 0) {
    return axios.get(`user`, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  } else {
    return axios.get(`user?userId=` + user_id, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  }
}

export function userFollowers(cookies, user_id = -1) {
  if (user_id < 0) {
    return axios.get(`user/followers`, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  } else {
    return axios.get(`user/followers?userId=` + user_id, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  }
}

export function follow(cookies, following_id) {
  return axios.post(
    `follow?followingId=` + following_id,
    {},
    {
      headers: {
        authorization: getToken(cookies),
      },
    }
  );
}

export function unfollow(cookies, following_id) {
  return axios.delete(`follow?followingId=` + following_id, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}
export function updatePersonalInfo(
  cookies,
  _first_name,
  _last_name,
  _bio,
  _profile_img
) {
  const formData = {
    first_name: _first_name,
    last_name: _last_name,
    bio: _bio,
    profile_image: _profile_img,
  };
  return axios.put(`profile/edit`, formData, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}
export function updatelongbio(cookies, _long_bio) {
  const formData = {
    long_bio: _long_bio,
  };
  return axios.put(`profile/edit`, formData, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}
export function updateContactInfo(
  cookies,
  _whatsapp_link,
  _instagram_link,
  _email,
  _user_name,
  _website
) {
  const formData = {
    username: _user_name,
    whatsapp_link: _whatsapp_link,
    instagram_link: _instagram_link,
    email: _email,
    website: _website,
  };
  return axios.put(`profile/edit`, formData, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}
