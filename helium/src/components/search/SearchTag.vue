<template>
  <button class="tag">
    {{ tag }}
  </button>
</template>

<script>
export default {
    name:"TagSearch",
    props:{
        tag:{
            require : true,
            type : String
        }
    },
};
</script>

<style scoped>
.tag {
  
    margin: 0 0 0 15px;
    padding: 5px 15px ;
    border-radius: 17px;
    background-color: var(--pale-grey);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85vw;
    border: none;
}
</style>