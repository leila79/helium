class User {
    constructor(user) {
        this.user_id = user.user_id || null;
        this.first_name = user.first_name || null;
        this.last_name = user.last_name || null;
        this.phone_number = user.phone_number || null;
        this.profile_image = user.profile_image || null;
        this.email = user.email || null;
        this.user_name = user.username || null;
        this.password = user.password || null;
        this.is_private = user.is_private || null;
        this.website = user.website || null;
        this.link = user.link || null;
        this.whatsapp_link = user.whatsapp_link || null;
        this.instagram_link = user.instagram_link || null;
        this.bio = user.bio || null;
        this.long_bio = user.long_bio || null;
        this.is_private = user.is_private;
    }
    
    setUserFollowersNumber(count){
        this.follower_number = count
    }
    setFollowBack(follow_back){
        this.follow_back = follow_back
    }
    setIsUser(is_user){
        this.is_user = is_user
    }
    setIsFollowed(is_followed){
        this.is_followed = is_followed
    }
}

module.exports = User;