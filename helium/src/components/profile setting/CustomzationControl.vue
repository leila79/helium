<template>
  <div class="personlization">
    <div class="fonts">
      <p class="title">فونت</p>
      <div class="personlization-row-container">
        <div class="font-name" v-for="(item,index) in fontNames" :key="index" @click="fontNameSelected = index" :style="fontNameItemStyle(index)">{{ item  }}</div>
      </div>
    </div>

    <div class="colors">
      <p class="title">رنگ فونت ها</p>
      <div class="personlization-row-container">
        <div class="color-name color1"></div>
        <div class="color-name color2"></div>
        <div class="color-name color3"></div>
        <div class="color-name color4"></div>
      </div>
    </div>

    <div class="font-size">
      <p class="title">سایز فونت</p>
      <div class="personlization-row-container">
        <div class="font-name" v-for="(item,index) in fontSizes" :key="index" @click="fontSizeSelected = index" :style="listItemStyle(index)">{{item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customzationInformationEdit",
  data() {
    return {
      fontSizes:["Sm","Md","Lg"],
      fontNames:["IRANSans","Bahij Helvetica","Kalameh"],
      fontSizeSelected : 1,
      fontNameSelected : 1,
    }
  },
  methods:{
    listItemStyle: function(i) {
      let style = {};
      
      if (i === this.fontSizeSelected) {
        style.backgroundColor = "#30bfb7";
        style.color = "#ffffff";
      }
      return style;
    },
    fontNameItemStyle(i){
      let style = {};
      
      if (i === this.fontNameSelected) {
        style.backgroundColor = "#30bfb7";
        style.color = "#ffffff";
      }
      return style;
    }
  }
};
</script>

<style scoped>

.personlization{

    justify-content: space-between;
    width: 90%;
    margin-top: 4vh;
    
    display: flex;
    flex-direction: row;
}
.fonts, .font-size , .colors{

    justify-content: space-between;
    padding: 10px 10px;
    margin-top: 2vh;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}
.font-name {
    width: auto;
    height: auto;
    border-radius: 6px;
    margin-right: 5px;
    margin-left: 5px;
    padding: 0px 5px;
    border: solid 2px var(--tealish);
    display: flex;
    justify-content: center;
    align-items: center;
}
.personlization-row-container{
   
    justify-content: space-between;
    width: 100%;
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
}

.color-name{
    
    width: 20px;
    height: 20px;    
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 5px;
}

.color1{
  background-color: #28394f;
}
.color2{
  background-color: #000000;
}
.color3{
  background-color: #808080;
}
.color4{
  background-color: #56838a;
}
.font-selected{
    width: auto;
    height: auto;
    border-radius: 6px;
    margin-right: 5px;
    margin-left: 5px;
    padding: 0px 5px;
    background-color:  var(--tealish);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
