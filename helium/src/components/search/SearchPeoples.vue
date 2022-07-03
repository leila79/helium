<template>
  <div class="-peoples">
    <img :src="imgPhoto" alt="profile-img" class="img-peoples" @click="goToPublisherProfile" />
    <div class="under-line">
      <div class="info" @click="goToPublisherProfile">
        <h3> {{ fullName }} </h3>
        <span> {{ longBio }} </span>
      </div>
      <div>
        <button @click="followUser()" v-if="!is_following && !isUser" class='follow'>دنبال کردن</button>
        <button @click="followUser()" v-else-if="is_following && !isUser" class='following'>دنبال شده</button>
      </div>
    </div>
  </div>
</template>

<script>
import { follow, unfollow } from '../../services/user'

export default {
  name: "SearchPeoples",
  props: {
    userId: {
      required: true,
      type: Number
    },
    fullName: {
      required: true,
      type: String
    },
    longBio: {
      required: true,
      type: String
    },
    imgPhoto: {
      required: true,
      type: String
    },
    isUser: {
      required: true,
      type: Boolean
    },
    isFollowed: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      profileImg: require("@/assets/img/profiles/5.jpg"),
      is_following: this.isFollowed,
    }
  },
  methods: {
    followUser() {
      if (this.is_following) {
        unfollow(this.$cookies, this.userId).then(() => {
          this.is_following = !this.is_following
        })
      } else {
        follow(this.$cookies, this.userId).then(() => {
          this.is_following = !this.is_following
        })
      }
    },
    goToPublisherProfile() {
      if (!this.isUser)
        this.$router.push({ name: 'ProfilePage', query: { userId: this.userId } })
      else this.$router.push({ name: 'ProfilePage' })
    }
  }
};
</script>

<style scoped>
.search-peoples {
  margin-top: 5vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.info {
  cursor: pointer;
  display: block;
  width: 100%;
  font-size: 0.8rem;
  margin-right: 1.5vw;
  line-height: 2;
}

.follow {
  width: auto;
  height: auto;
  padding: 3px 15px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: normal;
  border: 2px solid var(--water-blue);
  color: var(--water-blue);
  background-color: var(--white);
  white-space: nowrap;
  cursor: pointer;
}

.follow:hover {
  color: var(--white);
  background-color: var(--water-blue);
}

.img-peoples {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.under-line {
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(19, 158, 202, 0.3);
}

button.following {
  width: 5vw;
  height: auto;
  padding: 3px 15px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: normal;
  border: solid 2px var(--water-blue);
  color: white;
  background-color: var(--water-blue);
  cursor: pointer;
}
</style>
