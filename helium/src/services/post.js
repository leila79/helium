import axios from "axios";
import { getToken } from "./utils";

export function createPost(
  _title,
  _description,
  _image_address,
  _tags,
  cookie
) {
  const formData = {
    reading_time: "10",
    tags: _tags,
    title: "{" + _title + "}",
    description: "{" + _description + "}",
    post_images: "{" + _image_address + "}",
  };

  return axios.post(`post`, formData, {
    headers: {
      authorization: getToken(cookie),
    },
  });
}

export function userPosts(cookies, user_id = -1) {
  if (user_id < 0) {
    return axios.get(`user/posts`, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  } else {
    return axios.get(`user/posts?userId=` + user_id, {
      headers: {
        authorization: getToken(cookies),
      },
    });
  }
}

export function getPosts(index) {
  return axios.get(`posts/all?Index=` + index);
}

export function likePost(post_id, like, cookies) {
  return axios.post(
    "like/post?postId=" + post_id,
    {
      like: like,
    },
    {
      headers: {
        authorization: getToken(cookies),
      },
    }
  );
}

export function getPostComments(post_id) {
  return axios.get(`comments?postId=` + post_id);
}

export function addPostComment(cookies, post_id, comment_text) {
  console.log(post_id);
  return axios.post(
    `comments?postId=` + post_id,
    {
      comment_text: comment_text,
    },
    {
      headers: {
        authorization: getToken(cookies),
      },
    }
  );
}

export function getPostsLogin(index, cookies) {
  return axios.get(`posts/all?Index=` + index, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}

export function getPostDetails(post_id) {
  return axios.get(`post?postId=` + post_id);
}

export function getPostDetailsLogin(post_id, cookies) {
  return axios.get(`post?postId=` + post_id, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}

export function getBookmarks(cookies) {
  return axios.get(`user/bookmarks`, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}

export function addBookmark(cookies, postId) {
  return axios.post(
    `bookmark?postId=` + postId,
    {},
    {
      headers: {
        authorization: getToken(cookies),
      },
    }
  );
}

export function deleteBookmark(cookies, postId) {
  return axios.delete(`bookmark?postId=` + postId, {
    headers: {
      authorization: getToken(cookies),
    },
  });
}
