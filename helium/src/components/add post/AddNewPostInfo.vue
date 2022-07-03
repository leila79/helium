<template>
  <input type="text" name="title" id="title" :placeholder="titlePlaceHolder" v-model="titleValue" />
  <icon-holder v-if="nonTag" v-bind="tag" @click="showModal()" />

  <modal-component v-if="visibleModal" @close="visibleModal = false" @selected="setTag($event)" />
  <input type="file" ref="file" style="display: none" @change="onFileChange($event)" />
  <div v-if="!nonTag" class="selectedTag">
    <div class="tag"> {{ selectedTag }} </div>
    <icon-holder v-bind="edit" @click="showModal()" />
  </div>
  <!-- <input
    name="description" type="text" class="info" :placeholder="descriptionPlaceHolder" v-model="descriptionValue" /> -->
  <app-text-area class="info" _class="info" :placeholder="descriptionPlaceHolder" _name="desciption"
    @childToParent="setDescription($event)" />
  <!-- <div class="another-img">
    <icon-holder v-bind="gallery"  @click="openGallery()" />
    <p>{{ imageAddress }}</p>
  </div> -->
</template>

<script>
import IconHolder from '../IconHolder.vue';
import ModalComponent from "../ModalComponent.vue"
import AppTextArea from '../AppTextArea.vue'
export default {
  name: "AddNewPostInfo",
  components: {
    IconHolder,
    ModalComponent,
    AppTextArea
  },
  watch: {
    titleValue(newValue) {
      this.$emit("titleValue", newValue);
    },
  },
  data() {
    return {
      gallery: {
        iconSrc: require("@/assets/icons/gallery-add.svg")
      },
      tag: {
        iconSrc: require("@/assets/icons/tag-2.svg")
      },
      edit: {
        iconSrc: require("@/assets/icons/edit.svg")
      },
      titlePlaceHolder: "عنوان مطلب خود را وارد کنید",
      descriptionPlaceHolder: "متن اصلی خود را وارد کنید",
      visibleModal: false,
      selectedTag: "نانو تکنولوژی",
      nonTag: true,
      titleValue: "",
      descriptionValue: "",
      imageAddress: ""
    }
  },
  methods: {
    showModal() {
      (this.visibleModal);
      this.visibleModal = true;
    },
    openGallery() {
      this.$refs.file.click();
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      const baseUrl = "./img/projects/"
      this.imageAddres = this.$refs.file.value;
      this.imageAddres = baseUrl + ((this.imageAddres.split("fakepath")[1]).replace(/\\/g, ""));

      // this.$emit('secoundImageChoose', this.imageAddres)
    },
    createImage(file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    setTag(event) {
      this.selectedTag = event;
      this.nonTag = false;
      this.$emit("sendTag", this.selectedTag)
    },
    setDescription(value) {
      this.descriptionValue = value;
      this.$emit("descriptionValue", this.descriptionValue);
    }
  }

};
</script>

<style scoped>
.info {
  margin-top: 6vh;
  width: 100%;
  border: none;
}

.tag {
  width: 7vw;
  height: auto;
  /* margin: 0 0 0 15px; */
  padding: 10px;
  margin-top: 5vh;
  border-radius: 40px;
  background-color: var(--pale-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border: none;
}

.selectedTag {
  width: auto;
  height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 0;
}

input {
  width: 100%;
  margin-top: 5vh;
  border-color: rgba(19, 158, 202, 0.3);
  border-radius: 10px;
  padding-right: 5px;
  font-size: 1rem;
  color: var(--dark-grey-blue);
  outline-color: #30bfb7;
  line-height: 3;
}

.another-img {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.another-img p {
  margin-top: 3vh;
  margin-right: 3vw;
}
</style>
