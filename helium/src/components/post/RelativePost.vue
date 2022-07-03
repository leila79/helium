<template>
   <alert v-if="showModal && !isLogin" @close="showModal = false"/> 
    <div class="other-posts">
        <img class="photo" :src="post_image" alt="more-post-img">

        <div class="other-post-holder">

            <div class="other-post-title" @click="goToPostdetails">
                <b>{{title}}</b>
            </div>
            <div class="details">
                <span>{{ date }}</span>
                    <div class="dot"></div>
                    <span> {{ reading_time }} دقیقه مطالعه</span>
                    <div class="dot"></div>
                    <button v-for="(tag,index) in tags" :key="index" class="tag">
                        {{ tag }}
                    </button>
                <img v-if="archivePost" :src="archiveAdd2IconUrl" class="bookmark-icon" @click="deletePostFromBookmarks()">
                <img v-else :src="archiveIconUrl" class="save-icon" @click="addPostToBookmarks()">
            </div>
        </div>
    </div>
</template>

<script>
import isLogin from '../../services/utils.js'
import Alert from '../Alert.vue'
import { addBookmark, deleteBookmark } from '../../services/post'

export default {
    name: 'RelativePost',
    components: {
        Alert, 
    },
    props: {
        id: {
            required: true,
            type: Number
        },
        title: {
            required: true,
            type: String
        },
        post_image: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: [String, Date]
        },
        reading_time: {
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
        isFollowing: {
            required: false,
            type: Boolean
        },
        isUserPost: {
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
            archivePost : this.bookMarked,
        }
    },
    methods: {
        goToPostdetails() {
            this.$router.push({name: 'SinglePage', query: {postId: this.id}})
        },
        addPostToBookmarks(){
            if(this.isLogin===true) {
                addBookmark(this.$cookies, this.Id)
                this.archivePost = !this.archivePost
            }
            else this.showModal= true
        },
        deletePostFromBookmarks(){
            if(this.isLogin) {
                deleteBookmark(this.$cookies, this.Id)
                this.archivePost = !this.archivePost
            }
            else this.showModal=true
        },
    },
    watch: {
        $route() {
            location.reload()
        }
    },
    created(){
        this.is_following= this.isFollowing
        this.isLogin = isLogin(this.$cookies)
        this.archivePost = this.bookMarked
    }

}
</script>

<style scoped>
.other-posts{
    margin-top:3vh;
    display: flex;
    flex-direction: row;
}
.other-posts .photo {

    width: 262px;
    height: 173px;
    border-radius: 5px;
}
.other-post-title{
    color: var(--dark-grey-blue);
    font-size: 1.25vw;
}
.other-post-title b:hover{
    color: var(--tealish);
    cursor: pointer;
}
.other-post-holder{
    margin-right: 3vw;
    justify-content: space-between;
    display: grid;
}
.tag {
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
.details {
    display: flex;
    align-self: flex-end;
    font-family: 'bahij-helvetica-light';
    font-size: 0.85vw;
    color: #5a5a5a;
    align-items: center;
}
.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #707070;
}
</style>