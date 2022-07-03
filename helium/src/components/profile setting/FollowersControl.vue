<template>
  <div class="content">
    <div class="private-account">
      <p class="title">حریم شخصی</p>
      <label for="follow">افراد برای دنبال کردن نیاز به تایید شما دارند</label>
      <input type="checkbox" name="follow" id="follow" checked />
    </div>
    <div>
      <p class="title">استخراج دنبال کنندگان</p>
      <label for="getFollowers"
        >از افراد دنبال کننده خود یک لیست تهیه کنید</label
      >
      <img
        :src="getFollowerListIconUrl"
        alt=""
        name="getFollowers"
      />
    </div>
  </div>
</template>

<script>
export default {
    name : "FollowerControl",
    components:{},
    data(){
        return{
            getFollowerListIconUrl : require("@/assets/icons/clipboard-export.svg")
        }
    }

};
</script>

<style scoped>
.title{
    font-size: 1rem;
    font-weight: bold;
    
}

.content{
    justify-content: space-between;
    width: 100%;
    margin-top: 4vh;
    display: flex;
    flex-direction: row;
}

label {
    /* Other styling... */
    text-align: left;
    clear: both;
    float:right;
    margin-left:15px;
  
}
.private-account input{

    width: 15px;
    height: 15px;
}

</style>
