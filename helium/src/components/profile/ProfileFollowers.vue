<template>

  <div class="followers-info">
    <div class="info-container">
      <img @click="goToProfileDetails()" alt="profile photo" class="profile-photo" :src="followerPhoto" />
      <div class="followers-name-and-short-bio">
        <span @click="goToProfileDetails()" class="followers-name">{{ followerName }}</span>
        <span class="followers-short-bio">
          {{ followerShortBio }}
        </span>
      </div>
    </div>

    <div>
      <button @click="followUser()" v-if="!is_following && !isUser" class="follower-btn">دنبال کردن</button>
      <button @click="followUser()" v-else-if="is_following && !isUser" class="following-btn">دنبال شده</button>
    </div>
    
  </div>

  
</template>

<script>
import { follow, unfollow } from '../../services/user'

export default {
  name: "ProfileFollower",
  props: {
    userId:{
      required: true,
      type: Number
    },
    followerPhoto: {
      required: true,
      type: String,
    },
    followerName: {
      required: true,
      type: String,
    },
    followerShortBio: {
      required: true,
      type: String,
    },
    isFollowed: {
      required: false,
      type: Boolean,
      default: false,
    },
    isUser: {
      required: false,
      type:Boolean,
      default: false,
    }
  },
  data() {
    return {
      instagramIconUrl: require("@/assets/icons/instagram.svg"),
      watssappIconUrl: require("@/assets/icons/whatsapp.svg"),
      emailIconUrl: require("@/assets/icons/sms.svg"),
      is_following: this.isFollowed
    };
  },
  methods: {
    goToProfileDetails() {
      if(this.isUser)
        this.$router.push({name: 'ProfilePage'})
      else
        this.$router.push({name: 'ProfilePage', query: {userId: this.userId}})
    },
    followUser(){
      if(this.is_following) {
          unfollow(this.$cookies, this.userId).then(() => {
            
              this.is_following = !this.is_following 
              this.$store.dispatch("getProfilFollower")
              this.$store.dispatch("getProfileDetails") 
          })
      }else{
          follow(this.$cookies, this.userId).then(() => {
             
              this.is_following = !this.is_following 
              this.$store.dispatch("getProfilFollower")
              this.$store.dispatch("getProfileDetails") 
          })
      }
    }
  },
  watch: {
      $route() {
          location.reload()
      }
  },
  created(){
    this.is_following = this.isFollowed
  }
};
</script>

<style scoped>

.followers-info {
  margin-top: 3vh;
  width: 40%;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px;
  justify-self: flex-start;
  justify-content: space-between;
}

.info-container img {
  width: 4.3vw;
  height: 4.3vw;
  border-radius: 50%;
  object-fit: cover;
}
.profile-photo{
  cursor: pointer;
}
.followers-name {
  color: var(--dark-grey-blue);
  font-weight: bold;
  cursor: pointer;
}
.followers-name-and-short-bio {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1vh;
  font-size: 0.8rem;
  margin-right: 1.5vw;
  line-height: 2;

}
.followers-info .follower-btn {
  width: auto;
  height: auto;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: normal;
  border: 2px solid var(--water-blue);
  color: var(--water-blue);
  background-color: var(--white);
  cursor: pointer;
}

.followers-info .following-btn {
  width: auto;
  height: auto;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: normal;
  border: 2px solid var(--water-blue);
  color: white;
  background-color: var(--water-blue);
}

.info-container {
  display: flex;
  /* justify-content: center; */
}
.between{
    width: 5%;
    background-color: var(--white);
}
</style>
