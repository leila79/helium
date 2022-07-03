<template>
    <div class="comments">
        <div><b>{{ first_name }} {{ last_name }}</b></div>
        <div class="actions">

            <div class="details-comment">
                <div>{{ reading_time }} دقیقه مطالعه</div>
                <div class="dot"></div>
                <div>{{ date }}</div>
            </div>

            <div class="like-and-forward-icons">
                <div class="like">
                    <div class="like-number">{{ likes }}</div>
                    <img :src="likeIconUrl" alt="like" class="like-icon" @click="liked">
                </div>
                <img :src="forwardIconUrl" alt="">
            </div>
        </div>
    </div>

    <div class="text-post">
        <div>{{ comment_text }}</div>
    </div>

    <reply v-for="(reply, index) in replies" :key="index" v-bind="reply" />

    <seperator />


</template>

<script>
import Reply from './Reply.vue'
import Seperator from './Seperator.vue'

export default {
    name: 'comment_component',
    components: {
        Reply,
        Seperator,
    },
    props: {
        id: {
            required: true,
            type: Number
        },
        post_id: {
            required: true,
            type: Number
        },
        first_name: {
            required: true,
            type: String
        },
        user_id: {
            required: true,
            type: Number
        },
        last_name: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: String
        },
        reading_time: {
            required: true,
            type: Number
        },
        like_number: {
            required: true,
            type: Number
        },
        comment_text: {
            required: true,
            type: String
        },
        replies: {
            required: true,
            type: Array
        },
        email: {
            required: false,
            type: String
        }
    },
    data() {
        return {
            likeIconUrl: require("@/assets/icons/like1.svg"),
            forwardIconUrl: require("@/assets/icons/forward-square.svg"),
            likes: this.like_number
        }
    },
    methods: {
        liked() {
            this.likes += 1
        }
    }
}
</script>

<style>
.comments {
    font-size: 1.1vw;
    margin-top: 2vh;
}

.actions {

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.details-comment {
    font-family: 'bahij-helvetica-light';
    color: var(--dark-grey-blue);
    font-size: .85vw;
    margin-top: 1vh;
    display: flex;
    align-items: center;
}

.like {
    justify-content: center;
    display: flex;
    align-items: flex-start;
}

.like-number {
    font-size: 1.1vw;
    color: var(--water-blue);
}

.like-and-forward-icons {
    align-items: flex-start;
    margin-top: 1vh;
    justify-content: center;
    display: flex;
}

.like-icon {
    margin-left: 10px;
    width: 24px;
    height: 24px;
    margin-right: 5px;
}

.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #707070;
}

.text-post {
    margin-top: 2vh;
    line-height: 2;
    font-size: 1.15vw;
    color: var(--dark-grey-blue);
}
</style>