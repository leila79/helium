<template>
    <app-header />

    <spinner_component v-if="isLoading" />
    <div class="container" v-if="!isLoading">
        <div class="title">
            <img :src="save1IconUrl">
            <b>مقالات ذخیره شده</b>
        </div>

        <div class="content">

            <post_component v-for="(post, index) in posts" :key="index" v-bind="post" :bookMarked=true />
        </div>
    </div>

    <app-footer />
</template>

<script>
import post_component from '../components/post/Post.vue'
import { getBookmarks } from '../services/post'
import PostMaker from '../components/post/post-maker.js'

export default {
    name: 'BookmarkPage',
    components: {
        post_component,
    },
    data() {
        return {
            archiveAdd2IconUrl: require("@/assets/icons/archive-add-2.svg"),
            save1IconUrl: require("@/assets/icons/save-1.svg"),
            posts: [],
            isLoading: false
        }
    },
    methods: {
        async loadBookmarks() {
            this.isLoading = true;
            const response = await getBookmarks(this.$cookies)
                .then(res => { return res.data.result })
                .catch(err => (err))
                .finally(() => (this.isLoading = false))

            this.posts = response.map(post => (PostMaker(post)))
        }
    },
    watch: {
        $route() { }
    },
    beforeMount() {
        this.loadBookmarks()
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    /* display: flex; */
}

.container .content {
    width: 72vw;
    height: 100%;
    margin: auto;
}

.container .title {
    width: 72vw;
    margin: auto;
    display: flex;
    align-items: center;
    padding-top: 1vw;
    padding-bottom: 5vw;
}

.title b {
    font-size: 1.5vw;
    color: var(--dark-grey-blue);
    font-weight: bold;
    margin-top: 3vh;
    padding-right: 8px;
}
</style>