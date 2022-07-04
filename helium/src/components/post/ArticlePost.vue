<template>
    <alert v-if="showModal && !isLogin" @close="showModal = false" />
    <div class="post-publisher-info">
        <img alt="profile-photo" :src="publisherPhoto" @click="showModal = true">
        <div class="name" @click="showModal = true">{{ publisher }}</div>
        <button @click="followUser()" v-if="!is_following && !isUserPost" class='follow'>دنبال کردن</button>
        <button @click="followUser()" v-else-if="is_following && !isUserPost" class='following'>دنبال شده</button>

    </div>

    <!-- title  -->
    <div class="main-title">
        <b>{{ mainTitle }}</b>
    </div>
    <div class="details">
        <div>{{ publishedDate }}</div>
        <div class="dot"></div>
        <div>{{ readingTime }} دقیقه مطالعه</div>

        <div class="dot"></div>
        <button class="tag" v-for="(tag, index) in tags" :key="index"> {{ tag }} </button>
        <img v-if="archivePost" :src="archiveAdd2IconUrl" class="bookmark-icon" @click="deletePostFromBookmarks()">
        <img v-else :src="archiveIconUrl" class="save-icon" @click="addPostToBookmarks()">
        <span class="like-number">{{ likeNumber }}</span>
        <img v-if="!liked" :src="likeIconUrl" class="like-icon" @click="like()">
        <img v-else :src="likeIconUrl2" class="like-icon" @click="like()">
    </div>

    <!-- image  -->
    <div class="img-post-holder">
        <img :src="postPhoto1" alt="post-image" class="img-post">
    </div>
    <!-- text  -->
    <div class="text-post">
        <p>{{ textPost1 }}</p>
    </div>

    <div class="title">
        <b>{{ title }}</b>
    </div>


</template>

<script>
import Alert from '../Alert.vue'
import isLogin from '../../services/utils.js'
import { addBookmark, deleteBookmark, likePost } from '../../services/post'
import { follow, unfollow } from '../../services/user'

export default {
    name: 'ArticlePost',
    components: {
        Alert,
    },
    props: {
        Id: {
            required: true,
            type: Number
        },
        userId: {
            required: true,
            type: Number
        },
        publisher: {
            required: true,
            type: String
        },
        publisherPhoto: {
            required: true,
            type: String
        },
        mainTitle: {
            required: true,
            type: String
        },
        textPost1: {
            required: true,
            type: String
        },
        title: {
            required: true,
            type: String
        },
        postPhoto1: {
            required: true,
            type: String
        },
        publishedDate: {
            required: true,
            type: [String, Date]
        },
        readingTime: {
            required: true,
            type: Number
        },
        tags: {
            required: true,
            type: Array
        },
        bookMarked: {
            required: true,
            type: Boolean,
        },
        like_number: {
            required: false,
            type: [Number, String]
        },
        isFollowing: {
            required: false,
            type: Boolean
        },
        isUserPost: {
            required: false,
            type: Boolean
        },
        isLiked: {
            required: false,
            type: Boolean
        }
    },

    data() {
        return {
            isLogin: false,
            showModal: false,
            likeIconUrl: require("@/assets/icons/like1.svg"),
            likeIconUrl2: require("@/assets/icons/like2.svg"),
            archiveIconUrl: require("@/assets/icons/archive-add.svg"),
            archiveAdd2IconUrl: require("@/assets/icons/archive-add-2.svg"),
            archivePost: this.bookMarked,
            liked: this.isLiked,
            likeNumber: this.like_number
        }
    },
    methods: {
        addPostToBookmarks() {
            if (this.isLogin === true) {
                addBookmark(this.$cookies, this.Id)
                this.archivePost = !this.archivePost
            }
            else this.showModal = true
        },
        deletePostFromBookmarks() {
            if (this.isLogin) {
                deleteBookmark(this.$cookies, this.Id)
                this.archivePost = !this.archivePost
            }
            else this.showModal = true
        },
        followUser() {
            if (!this.isLogin) this.showModal = true
            else {
                if (this.is_following) {
                    unfollow(this.$cookies, this.userId).then(() => {
                        this.$store.dispatch("getProfilFollower")
                        this.is_following = false
                    })
                } else {
                    follow(this.$cookies, this.userId).then(() => {
                        this.$store.dispatch("getProfilFollower")
                        this.is_following = true
                    })
                }
            }
        },
        like() {
            if (!this.isLogin) this.showModal = true
            else {
                this.likeNumber = (this.liked ? parseInt(this.likeNumber) - 1 : parseInt(this.likeNumber) + 1)
                if (this.liked) likePost(this.Id, -1, this.$cookies)
                else likePost(this.Id, 1, this.$cookies)
                this.liked = !this.liked
            }
        }
    },
    created() {
        this.is_following = this.isFollowing
        this.isLogin = isLogin(this.$cookies)
        this.archivePost = this.bookMarked
        this.liked = this.isLiked
        console.log(this.isLiked);
    }
}
</script>

<style scoped>
.post-publisher-info {
    align-self: flex-start;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    width: 100%;
}

.post-publisher-info img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
    cursor: pointer;
}

.post-publisher-info .name {
    color: var(--dark-grey-blue);
    font-size: 0.94vw;
    font-weight: normal;
    margin: 0 15px;
    cursor: pointer;
}

.post-publisher-info .follow {
    width: 5.27vw;
    border-radius: 6px;
    font-size: 0.94vw;
    border: solid 2px #139eca;
    color: #139eca;
    background-color: var(--white);
}

.post-publisher-info .follow:hover {
    background-color: var(--water-blue);
    color: var(--white);
}

.post-publisher-info .following {
    width: 5.27vw;
    border-radius: 6px;
    font-size: 0.94vw;
    border: solid 2px var(--water-blue);
    color: white;
    background-color: var(--water-blue);
    cursor: pointer;
}

/* title  */
.main-title {
    color: var(--dark-grey-blue);
    font-size: 1.45vw;
    margin-top: 2vh;
}

.title {
    margin: 4vw 0 1vw 0;
    color: var(--dark-grey-blue);
    font-size: 1.25vw;
}

.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #707070;
}

.details {
    margin-top: 2vw;
    display: flex;
    align-items: center;
    width: 100%;
    font-family: 'bahij-helvetica-light';
    color: var(--dark-grey-blue);
    font-size: .85vw;
}

.details .tag {
    width: 4.2vw;
    height: 24px;
    margin: 0 0 0 15px;
    padding: 2px 11px 3px 12px;
    border-radius: 17px;
    background-color: var(--pale-grey);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85vw;
    border: none;
}

.bookmark-icon {
    cursor: pointer;
    height: 22px;
}

.like-icon {
    margin-left: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.like-number {
    font-size: 1.1vw;
    color: var(--water-blue);
    margin-right: 20px;
    margin-top: 7px;
    font-weight: bold;
    display: flex;
}

.img-post-holder {
    margin: 2vw 0;
    width: 100%;
}

.img-post {
    width: 100%;
    border-radius: 7px;
    flex: 1;
}

.text-post {
    margin-top: 2vh;
    line-height: 2;
    font-size: 1.15vw;
    text-align: justify;
    color: var(--dark-grey-blue);
}

@media(max-width: 1200px) {
    .moreDetails {
        font-size: .95vw;
    }

    .moreDetails .tag {
        width: 4.5vw;
        font-size: .95vw;
    }

    .profile .publisher {
        font-size: 1.18vw;
    }

    .profile-title button.follow {
        width: 6.5vw;
        font-size: 1.18vw;
    }

    .post-publisher-info .name {
        font-size: 0.8rem;
    }

    .save-icon,
    .like-icon,
    .bookmark-icon {
        height: 22px;
    }
}

@media(max-width: 992px) {
    .moreDetails .tag {
        width: 5vw;
    }

    .save-icon,
    .like-icon {
        height: 19px;
    }
}

@media(max-width: 768px) {
    .moreDetails .tag {
        width: 7vw;
        height: 24px;
        margin: 0 0 0 12px;
        border-radius: 12px;
        font-size: 1.4vw;
    }

    .save-icon,
    .like-icon,
    .bookmark-icon {
        height: 16px;
    }
}

@media(max-width: 600px) {
    .post-publisher-info .name {
        font-size: 0.7rem
    }

    .moreDetails .tag {
        width: 8vw;
        margin: 0 0 0 15px;
        border-radius: 12px;
        font-size: 1.8vw;
    }

    .dot {
        width: 2px;
        height: 2px;
        margin: 0 9px;
    }

    .profile .img-holder img {
        width: 27px;
        height: 27px;
    }

    .save-icon,
    .like-icon,
    .bookmark-icon {
        height: 14px;
    }
}
</style>