<template>
    <alert v-if="showModal && !isLogin" @close="showModal = false" />
    <div v-bind:class="[wrapped ? 'post-wrap' : '', 'post']">
        <div class="description">
            <div class="profile-title">
                <div class="profile">
                    <div class="img-holder">
                        <img alt="profile photo" :src="publisherPhoto" @click="goToPublisherProfile">
                    </div>
                    <span class="publisher" @click="goToPublisherProfile">{{ publisher }}</span>
                </div>
                <div class="btn-holder">
                    <img v-if="archivePost" :src="archiveAdd2IconUrl" alt="bookmarked" class="bookmark-icon"
                        @click="deletePostFromBookmarks()" />
                </div>
            </div>

            <div>
                <div class="mainTitle" @click="goToPostdetails">
                    <b>{{ mainTitle }}</b>
                </div>
                <div class="sec-title">
                    <span> {{ title }} </span>
                </div>
                <div class="moreDetails">
                    <span>{{ publishedDate }}</span>
                    <div class="dot"></div>
                    <span> {{ readingTime }} دقیقه مطالعه </span>
                    <div class="dot"></div>
                    <button class="tag" v-for="(tag, index) in tags" :key="index">
                        {{ tag }}
                    </button>
                    <img v-if="!archivePost" class="archive-icon" :src="archiveIconUrl" @click="addPostToBookmarks()">
                    <div class="interaction-info">
                        <span class="comment-number">{{ comment_number }}</span>
                        <img class="comment_icon" :src="commentIconUrl">
                        <span class="like-number">{{ likeNumber }}</span>
                        <img v-if="!liked" :src="likeIconUrl" class="like-icon" @click="like()">
                        <img v-else :src="likeIconUrl2" class="like-icon" @click="like()">
                    </div>
                </div>
            </div>
        </div>

        <div class="photo">
            <img alt="post photo" :src="postPhoto1">
        </div>
    </div>
</template>

<script>
import Alert from '../Alert.vue'
import isLogin from '../../services/utils.js'
import { addBookmark, deleteBookmark, likePost } from '../../services/post'

export default {
    components: {
        Alert,
    },
    name: 'profile_post',
    props: {
        Id: {
            required: true,
            type: [String, Number]
        },
        userId: {
            required: true,
            type: [String, Number]
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
        wrapped: {
            required: true,
            type: Boolean
        },
        bookMarked: {
            required: true,
            type: Boolean,
        },
        like_number: {
            required: false,
            type: Number,
        },
        isFollowing: {
            required: false,
            type: Boolean
        },
        isUserPost: {
            required: false,
            type: Boolean
        },
        comment_number: {
            required: false,
            type: [Number, String]
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
            archiveIconUrl: require("@/assets/icons/archive-add.svg"),
            archiveAdd2IconUrl: require("@/assets/icons/archive-add-2.svg"),
            archivePost: false,
            likeIconUrl: require("@/assets/icons/like1.svg"),
            likeIconUrl2: require("@/assets/icons/like2.svg"),
            commentIconUrl: require("@/assets/icons/message.png"),
            saveIconUrl: require("@/assets/icons/archive-add.svg"),
            liked: this.isLiked,
            likeNumber: this.like_number
        }

    },
    mounted() {
        this.archivePost = this.bookMarked;
    },
    methods: {
        goToPostdetails() {
            this.$router.push({ name: 'SinglePage', query: { postId: this.Id } })
        },
        goToPublisherProfile() {
            if (this.isLogin)
                this.$router.push({ name: 'ProfilePage', query: { userId: this.userId } })
            else this.showModal = true
        },
        addPostToBookmarks() {
            if (this.isLogin) {
                addBookmark(this.$cookies, this.Id)
                this.archivePost = true
            }
            else this.showModal = true
        },
        deletePostFromBookmarks() {
            if (this.isLogin) {
                deleteBookmark(this.$cookies, this.Id)
                this.archivePost = false
            }
            else this.showModal = true
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
        this.isLogin = isLogin(this.$cookies)
        this.liked = this.isLiked
        this.likeNumber = this.like_number
    }
}
</script>

<style scoped>
.post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2vw;
}

.post-wrap {
    flex-wrap: wrap;
}

.post .description {
    width: 47%;
    padding: 7vh 0;
}

.post .profile-title {
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
}

.mainTitle b {
    color: var(--dark-grey-blue);
    margin-bottom: 10px;
    font-family: 'bahij-helvetica-bold';
    font-size: 1.25vw;
    line-height: 2;
}

.like-icon,
.comment_icon {
    margin-right: 5px;
    margin-top: 6px;
    width: 22px;

    height: 22px;
}

.like-icon {
    cursor: pointer;
}

.like-number {
    font-size: 1vw;
    color: var(--water-blue);
    margin-right: 15px;
    margin-top: 7px;
    font-weight: bold;
    display: flex;
}

.comment-number {
    font-size: 1vw;
    color: var(--water-blue);
    margin-top: 7px;
    font-weight: bold;
    display: flex;
}

.interaction-info {
    padding-right: 10px;
    display: flex;
    justify-content: space-around;
}

.mainTitle b:hover {
    color: var(--tealish);
    cursor: pointer;
}

.sec-title {
    margin-bottom: 23px;
}

.sec-title span {
    color: var(--dark-grey-blue);
    font-size: 1.05vw;
    line-height: 2;
}

.moreDetails {
    display: flex;
    align-items: center;
    font-family: 'bahij-helvetica-light';
    font-size: 0.85vw;
    color: #5a5a5a;
}

.moreDetails .tag {
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

.profile {
    display: flex;
    align-items: center;
    width: 100%;
}

.profile .img-holder {
    overflow: hidden;
    cursor: pointer;
}

.profile .img-holder img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
}

.profile .publisher {
    color: var(--dark-grey-blue);
    font-size: 0.94vw;
    font-weight: normal;
    margin: 0 15px;
    cursor: pointer;
}

.btn-holder {
    display: flex;
}

.bookmark-icon {
    cursor: pointer;
    margin-right: 2vh;
}

.profile-title button.follow {
    width: 5.27vw;
    border-radius: 6px;
    font-size: 0.94vw;
    border: solid 2px var(--water-blue);
    color: var(--water-blue);
    background-color: var(--white);
}

.profile-title button.follow:hover {
    background-color: var(--water-blue);
    color: var(--white);
}

.post .photo {
    width: 45%;
    height: 30%;
    display: flex;
    align-items: center;
}

.post .photo img {
    width: 100%;
    border-radius: 7px;
    flex: 1;
}

.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #707070;
}

.archive-icon {
    cursor: pointer;
}

@media(max-width: 1200px) {
    .container .content {
        width: 80vw;
    }

    .post {
        margin-bottom: 5%;
    }

    .post .photo {
        width: 44%;
    }

    .post .description {
        width: 46%;
        padding: 0vh 0;
    }

    .post .profile-title {
        margin: 0 0 10px 0;
    }

    .sec-title span {
        font-size: 1.18vw;
    }

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
}

@media(max-width: 992px) {
    .container .content {
        width: 80vw;
    }

    .profile .img-holder img {
        width: 25px;
        height: 25px;
    }

    .post .photo {
        width: 49%;
    }

    .post .photo img {
        border-radius: 5px;
    }

    .post .description {
        width: 44%;
        padding: 3vh 0;
    }

    .sec-title {
        margin-bottom: 20px;
    }

    .moreDetails .tag {
        width: 5vw;
    }

    .archive-icon {
        height: 19px;
    }
}

@media(max-width: 768px) {
    .container .content {
        width: 70vw;
    }

    .dot {
        width: 2.5px;
        height: 2.5px;
        margin: 0 10px;
    }

    .profile-title button.follow {
        width: 10vw;
        font-size: 1.68vw;
    }

    .mainTitle {
        font-size: 2.1vw;
    }

    .sec-title span {
        font-size: 1.8vw;
    }

    .moreDetails {
        font-size: 1.4vw;
    }

    .moreDetails .tag {
        width: 7vw;
        height: 24px;
        margin: 0 0 0 12px;
        border-radius: 12px;
        font-size: 1.4vw;
    }

    .post {
        flex-wrap: wrap;
        margin-bottom: 12vw;
    }

    .post .photo {
        width: 100%;
    }

    .post .photo img {
        border-radius: 5px;
    }

    .post .description {
        width: 100%;
        padding: 3vh 0 4vw 0;
    }

    .post .profile-title {
        margin: 0 0 20px 0;
    }

    .profile .publisher {
        font-size: 1.7vw;
    }

    .profile .img-holder img {
        width: 30px;
        height: 30px;
    }

    .archive-icon {
        height: 19px;
    }
}

@media(max-width: 600px) {
    .container .content {
        width: 86vw;
    }

    .post {
        margin-bottom: 15vw;
    }

    .profile .publisher {
        font-size: 2.15vw;
    }

    .profile-title button.follow {
        width: 12vw;
        font-size: 2.1vw;
    }

    .mainTitle {
        font-size: 2.5vw;
    }

    .sec-title span {
        font-size: 2.2vw;
    }

    .moreDetails {
        font-size: 1.8vw;
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

    .archive-icon {
        height: 18px;
    }
}

@media(max-width: 400px) {
    .profile .publisher {
        font-size: 2.7vw;
        margin: 0 7px
    }

    .post {
        margin-bottom: 20vw;
    }

    .post .description {
        padding: 3vh 0 5vw 0;
    }

    .post .profile-title {
        margin: 0 0 15px 0;
    }

    .profile-title button.follow {
        width: 16vw;
        font-size: 2.7vw;
        border-width: 1px;
    }

    .mainTitle {
        font-size: 3vw;
    }

    .sec-title span {
        font-size: 2.7vw;
    }

    .moreDetails {
        font-size: 2vw;
    }

    .moreDetails .tag {
        width: 9.5vw;
        border-radius: 10px;
        font-size: 2vw;
    }

    .archive-icon {
        height: 14px;
    }
}
</style>