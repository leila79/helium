export default function headerInfoMaker(info) {
  // console.log("4", info.is_followed);
  if (info.profile_image) {
    return {
      profileImg: require("@/assets" + info.profile_image),
      shortBio: info.bio,
      userName: info.first_name + " " + info.last_name,
      followers: info.follower_number.toString(),
      isFollowed: info.is_followed,
      userId: info.user_id,
      websiteAddress: info.website,
    };
  } else {
    return {
      shortBio: info.bio,
      userName: info.first_name + " " + info.last_name,
      followers: info.follower_number.toString(),
      isFollowed: info.is_followed,
      userId: info.user_id,
      websiteAddress: info.website,
    };
  }
}

export function aboutInfoMaker(info) {
  let completeInfo = {};
  if (info.profile_image) {
    completeInfo = {
      userId: info.user_id,
      firstName: info.first_name,
      lastName: info.last_name,
      shortBio: info.bio,
      website: info.website,
      fullName: info.first_name + " " + info.last_name,
      longBio: info.long_bio,
      profileImage: require("@/assets" + info.profile_image),
      userName: info.user_name,
      instagram_link: info.instagram_link,
      whatsapp_link: info.whatsapp_link,
      email: info.email,
    };
  } else {
    completeInfo = {
      userId: info.user_id,
      firstName: info.first_name,
      lastName: info.last_name,
      shortBio: info.bio,
      website: info.website,
      fullName: info.first_name + " " + info.last_name,
      longBio: info.long_bio,
      userName: info.user_name,
      instagram_link: info.instagram_link,
      whatsapp_link: info.whatsapp_link,
      email: info.email,
    };
  }

  completeInfo = JSON.parse(JSON.stringify(completeInfo));
  return completeInfo;
}

export function followerMaker(follower) {
  let pimg = null;
  if (follower.profile_image) {
    pimg = require("@/assets" + follower.profile_image);
  }
  return {
    userId: follower.user_id,
    isUser: follower.is_user,
    followerPhoto: pimg,
    followerName: follower.first_name + " " + follower.last_name,
    followerShortBio: follower.bio,
    isFollowed: follower.follow_back,
  };
}
