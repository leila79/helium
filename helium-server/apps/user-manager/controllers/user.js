const User = require("../models/User");
const { query, sendResponse } = require("../../../utils.js");
const { statusCodes, messages } = require("../../../utils");
const { hashPwd } = require("../../authentication/utils/hash.js");

async function changePassword(req, res) {
  const user_id = req.user_id;
  try {
    if (user_id) {
      if (req.data.newpassword) {
        const passHash = hashPwd(req.data.newpassword);
        await query(
          `UPDATE users SET password='${passHash}' WHERE user_id=${userId}`
        );
        userId = undefined;
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
      } else {
        sendResponse(res, statusCodes.FAILED, messages.FAILED, {
          statuscode: 400,
          messages: "پسورد را وارد کنید",
        });
      }
    } else {
      sendResponse(res, statusCodes.FAILED, messages.FAILED);
    }
  } catch (err) {
    console.log("Database ", err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED);
  }
}

async function checkEmail(req, res) {
  // console.log(req.data);
  const email = req.data.email;

  try {
    const users = await query(
      `SELECT COUNT(*) FROM users WHERE email='${email}'`
    );
    // console.log("users:---> ", users);
    if (users.rows[0].count > 0) {
      userId = (
        await query(
          `SELECT user_id FROM users WHERE email='${email}' ORDER BY user_id ASC LIMIT 1`
        )
      ).rows[0].user_id;
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
    } else {
      sendResponse(res, statusCodes.FAILED, messages.FAILED, {
        statuscode: 404,
        messages: "کاربر وجود ندارد!",
      });
    }
  } catch (err) {
    console.log("Database ", err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED);
  }
}

async function getProfileInfo(req, res) {
  const user_id = req.user_id;

  try {
    const user = await query(`SELECT * FROM users WHERE user_id=${user_id}`);
    const followers_number = await query(
      `SELECT COUNT(user_id) FROM follows WHERE following_id=${user_id}`
    );
    const is_followed = await query(
      `SELECT * FROM follows WHERE following_id=${user_id} AND user_id=${req.main_user_id}`
    );

    var user_info = new User(user.rows[0]);
    user_info.setUserFollowersNumber(followers_number.rows[0].count);
    if (is_followed.rows.length > 0) user_info.setIsFollowed(true);
    else user_info.setIsFollowed(false);

    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, user_info);
  } catch (err) {
    console.log(err);
    sendResponse(res, messages.FAILED, statusCodes.FAILED);
  }
}

async function getUserFollowers(req, res) {
  const user_id = req.user_id;
  const main_user_id = req.main_user_id;
  let user_followers = [];

  try {
    const followers = await query(
      `SELECT user_id,first_name,last_name,profile_image,bio FROM users WHERE user_id IN (SELECT DISTINCT user_id from follows WHERE following_id=${user_id})`
    );
    const following = await query(
      `SELECT following_id FROM follows WHERE user_id=${main_user_id}`
    );
    Array.prototype.push.apply(user_followers, followers.rows);

    /* check if any of the user followers, follows user back */
    for (let i = 0; i < user_followers.length; i++) {
      user_followers[i] = new User(user_followers[i]);
      user_followers[i].setFollowBack(false);
      if (user_followers[i].user_id == req.main_user_id)
        user_followers[i].setIsUser(true);
      for (let j = 0; j < following.rows.length; j++) {
        if (user_followers[i].user_id == following.rows[j].following_id) {
          user_followers[i].setFollowBack(true);
          break;
        }
      }
    }
    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, user_followers);
  } catch (err) {
    console.log(err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED);
  }
}

async function register(req, res) {
  console.log(req.data);
  const {
    username,
    password,
    first_name,
    last_name,
    phone_number,
    bio,
    email,
  } = req.data;

  try {
    let user_id = await query(`SELECT MAX(user_id) FROM users`);
    user_id = user_id.rows[0].max;
    const users = await query(
      `SELECT COUNT(*) FROM users WHERE username='${username}'`
    );
    if (users.rows[0].count > 0) {
      sendResponse(res, statusCodes.FAILED, messages.FAILED, {
        statuscode: 402,
        messages: "نام کاربری تکراری است.",
      });
    } else {
      console.log(password);
      const passHash = hashPwd(password);
      await query(`INSERT INTO users(user_id,first_name,last_name,username,password,phone_number,bio,email)
                  VALUES(${
                    user_id + 1
                  },'${first_name}','${last_name}','${username}','${passHash}','${phone_number}','${bio}','${email}')`);
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
    }
  } catch (err) {
    console.log("Database ", err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED);
  }
}

async function editProfile(req, res) {
  const user_id = req.user_id;
  try {
    if (req.data.first_name)
      await query(
        `UPDATE users SET first_name='${req.data.first_name}' WHERE user_id=${user_id}`
      );
    if (req.data.last_name)
      await query(
        `UPDATE users SET last_name='${req.data.last_name}' WHERE user_id=${user_id}`
      );
    if (req.data.bio)
      await query(
        `UPDATE users SET bio='${req.data.bio}' WHERE user_id=${user_id}`
      );
    if (req.data.long_bio)
      await query(
        `UPDATE users SET long_bio='${req.data.long_bio}' WHERE user_id=${user_id}`
      );
    if (req.data.username)
      await query(
        `UPDATE users SET username='${req.data.username}' WHERE user_id=${user_id}`
      );
    if (req.data.whatsapp_link)
      await query(
        `UPDATE users SET whatsapp_link='${req.data.whatsapp_link}' WHERE user_id=${user_id}`
      );
    if (req.data.instagram_link)
      await query(
        `UPDATE users SET instagram_link='${req.data.instagram_link}' WHERE user_id=${user_id}`
      );
    if (req.data.email)
      await query(
        `UPDATE users SET email='${req.data.email}' WHERE user_id=${user_id}`
      );
    if (req.data.website)
      await query(
        `UPDATE users SET website='${req.data.website}' WHERE user_id=${user_id}`
      );
    if (req.data.is_private)
      await query(
        `UPDATE users SET isprivate=${req.data.is_private} WHERE user_id=${user_id}`
      );
    if (req.data.profile_image)
      await query(
        `UPDATE users SET profile_image='${req.data.profile_image}' WHERE user_id=${user_id}`
      );

    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
  } catch (err) {
    console.log("Database ", err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED);
  }
}

module.exports = {
  getProfileInfo,
  getUserFollowers,
  register,
  editProfile,
  changePassword,
  checkEmail,
};
