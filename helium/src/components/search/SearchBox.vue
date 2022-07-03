<template>
  <div class="search-box">
    <div class="arrow-right" @click=" goToSearch()">
      <img :src="arrowIconUrl" />
    </div>
    <input type="text" class="search-input-header" v-model="word"/>
  </div>
</template>

<script>
export default {
    name:"searchBox",
    data(){
        return{
            arrowIconUrl: require("@/assets/icons/arrow-right.svg"),
            word : ""
        }
    },
    methods:{
        goToSearch(){
           this.$router.push({path: '/search', query: { keyword: this.word }})
       }
    }
};
</script>

<style scoped>

.search-box{
    
    transition: 0.5s;
    width: 15vw;
    height: 5vh;
    display: flex;
    justify-content: space-around;
    
    border-radius: 10px;
    border: solid 1px rgba(19, 158, 202, 0.3);
    background-color: var(--white);
}
.search-input-header{
    
    border: none;
    width: 85%;
    border-radius: 10px 0px 0px 10px;
    margin-top: 0px;
}
.search-input-header :focus{
    outline: none;
}

.arrow-right{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid rgba(19, 158, 202, 0.3);
    width: 15%;
}
input:focus{
    outline: none;
}
</style>
