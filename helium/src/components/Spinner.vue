<template>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <flower-spinner :animation-duration="2500" :size="200" color="#ff1d5e" />
    </div>
  </div>
</template>

<script>
import { FlowerSpinner } from "epic-spinners";
export default {
  name: "spinner_component",
  components: {
    FlowerSpinner,
  },
  props: {
    display: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
}

/* Modal Content */
.modal-content {

  margin: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  margin-top: 3vh;
  border-radius: 5px;

  width: 30%;
}
</style>
