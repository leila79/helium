<template>
    <div class="show-replies">
        <div class="reply">
            <img :src="forwardIconUrl">
            <div><b>{{ first_name }} {{ last_name }}</b></div>
        </div>
        <div class="actions">

            <div class="details-reply">
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
        <div class="text-post">
            <div>{{ reply_text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'reply_component',
    props: {
        id: {
            required: false,
            type: Number
        },
        comment_id: {
            required: false,
            type: Number
        },
        user_id: {
            required: false,
            type: Number
        },
        first_name: {
            required: true,
            type: String
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
        reply_text: {
            required: true,
            type: String
        },

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
            this.likes += 1;
        }
    }

}
</script>

<style>
.reply {
    width: 20%;
    display: flex;
    align-items: center;
    font-size: 1.1vw;
}

.reply div {
    margin-right: 10px;
}

.show-replies {
    margin-top: 2vh;
    margin-right: 3vw;
}

.details-reply {
    font-family: 'bahij-helvetica-light';
    color: var(--dark-grey-blue);
    font-size: .85vw;
    margin-top: 1vh;
    display: flex;
    align-items: center;
}

.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #707070;
}

.like {
    justify-content: center;
    display: flex;
    align-items: flex-start;
}

.like-number {
    color: var(--water-blue);
    font-size: 1.1vw;
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

.text-post {
    margin-top: 2vh;
    line-height: 2;
    font-size: 1.15vw;
    color: var(--dark-grey-blue);
}
</style>