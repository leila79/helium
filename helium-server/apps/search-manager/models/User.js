class User {
    constructor(user) {
        this.user_id = user.user_id || null;
        this.first_name = user.first_name || null;
        this.last_name = user.last_name || null;
        this.profile_image = user.profile_image || null;
        this.long_bio = user.long_bio || null;
    }
    
    setIsUser(is_user){
        this.is_user = is_user
    }
    setIsFollowed(is_followed){
        this.is_followed = is_followed
    }
}

module.exports = User;