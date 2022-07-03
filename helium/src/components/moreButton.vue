<template>
  <div class="more-btn">
    <button class="load-more">
      مشاهده بیشتر
    </button>
  </div>
</template>

<script>
export default {
    name : "moreButton"
};
</script>

<style scoped>
.more-btn {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load-more {
  width: auto;
  height: auto;
  padding: 5px 100px 5px 100px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: var(--white);
  color: var(--tealish);
  border: 2px solid var(--tealish);
  cursor: pointer;
}

.load-more:hover {
  width: auto;
  height: auto;
  padding: 5px 100px 5px 100px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: var(--tealish);
  color: var(--white);
  border: 2px solid var(--tealish);
  cursor: pointer;
}
</style>
