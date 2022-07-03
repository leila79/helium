export default function UserMaker(user) {
    return {
        userId: user.user_id || null ,
        fullName: user.first_name + user.last_name || null,
        longBio: user.long_bio || null,
        imgPhoto: require("@/assets" + user.profile_image.slice(1)) || null,
        isUser: user.is_user,
        isFollowed: user.is_followed,
    }
}
