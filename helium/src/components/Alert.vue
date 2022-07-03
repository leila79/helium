<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            احراز هویت
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            لطفا ابتدا وارد حساب کاربری خود شوید و یا حساب جدید ایجاد کنید.
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">

            <button class="modal-default-button" @click="$emit('close')">
              متوجه شدم
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert_component',
  data() {
    return {

    }
  },
  methods: {
    //    close() {
    //        this.showModal = false
    //    }
  }

}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--white);
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border: none;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--dark-grey-blue);
  font-weight: bold;
}

.modal-body {
  margin: 20px 0;
  color: rgb(15, 15, 15);
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
  color: white;
  background: var(--tealish);
  padding: 3px 12px 4px 12px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>