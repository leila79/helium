class Post {
    constructor(post){
        this.id = post.id || null 
        this.user_id = post.user_id || null
        this.date = post.date || null
        this.reading_time = post.reading_time || null
        this.title = post.title || null
        this.description = post.description || null
        this.post_images = post.post_images || null
        this.like_number = post.like_number || 0
        this.user_post = false
        this.tags = post.post_tags || null
    }
    setLikeNumber(num){
        this.like_number = num
    }
    setIsLiked(is_liked){
        this.is_liked = is_liked
    }
    setAuthor(author){
        this.author = {}
        this.author.first_name = author.first_name;
        this.author.last_name = author.last_name;
        this.author.profile_image = author.profile_image;
    }
    setMorePosts(more_posts){
        this.more_posts = more_posts;
    }

    getMorePosts(){
        if (this.more_posts) return this.more_posts
        else return null
    }

    setTags(tags) {
        tags = tags.map( (tag) => {
            return tag.title
        })
        this.tags = tags;
    }
    
    setIsBookmarked(isBookmarked){
        this.is_bookmarked = isBookmarked
    }

    setIsFollowing(isFollowing){
        this.is_following = isFollowing
    }
    setUserPost(isUserPost){
        this.user_post = isUserPost
    }
    setCommentNumber(num){
        this.comment_number = num
    }
}


module.exports = Post