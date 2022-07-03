<template>
  <div class="profile-header-container">
    <img
      :src="headerImg"
      alt="headre-img"
      class="header-img"
    />

    <div class="info">
        <div class="personal__info">
            <img
            :src="profileImg"
            alt="profile-img"
            class="profile-image" />

            <div class="details">
                <div class="name-and-follows">
                    <div class="name">{{ userName }}</div>
                    <div class="dot"></div>
                    <div>{{ followers }} دنبال کننده</div>
                </div>
                <div class="short-bio"> {{ shortBio }}</div>
            </div>
        </div>

        <div class="buttons">
            <button @click="followUser()" v-if="!isUserProfile && !is_following" class="btn-follow">
                دنبال کردن<img :src="followIconUrl" />
            </button>
            <button @click="followUser()" v-if="!isUserProfile && is_following" class="btn-follow">
                دنبال شده
            </button>
            <button @click="goToWebsite()" class="btn-see-website">
                مشاهده ‌وبسایت<img :src="seeWebsiteIconUrl" />
            </button>
        </div>
    </div>
    
  </div>
</template>

<script>
import { follow, unfollow } from '../../services/user'

export default {
    name: "ProfileHeader",
    props:{
        profileImg: {
            required: true,
            type: String,
            default: require("@/assets/img/profiles/defualt-profile.svg"),
        },
        userId:{
            required: true,
            type: Number
        },
        userName: {
            required: true,
            type: String
        },
        shortBio: {
            required: true,
            type: String
        },
        followers: {
            required: false,
            type: String
        },
        isUserProfile: {
            required: false,
            type: Boolean,
            default: false,
        },
        isFollowed: {
            required: false,
            type: Boolean,
        },
        websiteAddress: {
            required: false,
            type: String,
            default: ''
        }
    },
    data() {
        return { 
            headerImg: require("@/assets/img/projects/7.png"),
            followIconUrl: require("@/assets/icons/add.svg"),
            seeWebsiteIconUrl: require("@/assets/icons/export.svg"),
            is_following: false
        }
        
    },
    methods: {
        followUser(){
            if(this.is_following) {
                unfollow(this.$cookies, this.userId).then(() => {
                    this.$store.dispatch("getProfilFollower")
                    this.is_following = !this.is_following 
                })
            }else{
                follow(this.$cookies, this.userId).then(() => {
                    this.$store.dispatch("getProfilFollower")
                    this.is_following = !this.is_following 
                })
            }
        },
        goToWebsite(){
            window.open('https://'+ this.websiteAddress, '_blank')
        }
    },
    created(){
        this.is_following = this.isFollowed;
    }
}
</script>

<style scoped>

.header-img {
    width: 100%;
    height: 17vh;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 1;
    object-fit: cover;
}
.info {
    display: flex;
    align-items: flex-end;
    margin-top: -6vw;
    justify-content: space-between;
}
.personal__info{
    display: flex;
    align-items: flex-end;
}
.profile-image {
    border-radius: 30px;
    width: 10vw;
    height: 10vw;
    z-index: 2;
    margin: 0 1vw;
    display: block;
}

.dot {
    width: 3px;
    height: 3px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: var(--warm-gray);
}
.name-and-follows {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: var(--dark-grey-blue);
}

.name {
    font-weight: bold;
}

.short-bio {
    font-size: 0.8rem;
}

.buttons {
    display: flex;
    cursor: pointer;
}

.btn-follow , .btn-see-website{
    height: 35px;
    width: 9.5vw;
    border-radius: 10px;
    align-items: center;
    font-size: 0.75rem;
    border: none;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 0 10px;
    padding: 0 5px;
}

.btn-follow {
    background-color: var(--tealish);
    color: var(--white);
}
.btn-see-website {
    background-color: var(--white);
    color: var(--tealish);
    border: 2px solid var(--tealish);
}

.btn-see-website img {
    margin-right: 5px;
}

@media (max-width: 1200px) {
  .btn-follow img {
      width: 20px;
      height: 20px;
  }
  .btn-see-website img {
      width: 15px;
      height: 15px;
  }
  .info {
      margin-top: -7vw;
   }
   .profile-image {
        width: 12vw;
        height: 12vw;
    }
}
@media (max-width: 992px) {
    .btn-see-website, .btn-follow {
        font-size: 0.7rem;
        width: 11vw;
        height: 30px;
    }
    .name-and-follows, .short-bio {
        font-size: .7rem;
    }
    .info {
        margin-top: -7vw;
    }
    .profile-image {
        width: 12vw;
        height: 12vw;
        border-radius: 17px;
    }
}
@media (max-width: 768px) {
  .btn-see-website, .btn-follow {
      font-size: 0.65rem;
      width: 13vw;
  }
  .profile-image {
        width: 15vw;
        height: 14vw;
        border-radius: 15px;
  }
  .name-and-follows, .short-bio {
      font-size: .65rem;
  }
  .info {
        margin-top: -8vw;
    }
}
@media (max-width: 600px) {
    .btn-see-website, .btn-follow {
        font-size: 0.8rem;
        height: 27px;
        width: 24vw;
    }
    .name-and-follows, .short-bio {
        font-size: .8rem;
    }
    .info {
        display: block;
        margin-top: -10vw;
    }
    .profile-image {
        width: 18vw;
        height: 18vw;
        border-radius: 15px;
        margin: 0 1vw 0 3vw;
    }
    .buttons{
        margin: 4vw 0;
    }
}

</style>

