<template>
   <div class="icon-container">
        <img :src="iconSrc" alt="" />
    </div>
</template>

<script>
export default {
  name: "IconHolder",
  props: {
    iconSrc: {
      required: true,
      type: String,
    },

  },
}
</script>

<style>

.icon-container{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    margin-top: 3vh;
    height: 42px;
    border-radius: 50%;
    background-color: #29becc;
}
</style>
