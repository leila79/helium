<template>
  <div class="add-new-story">
    <img :src="addIcon" />
    <h3>{{ title }}</h3>
  </div>
  <input type="file" ref="file" style="display: none" @change="onFileChange($event)" />
  <div class="img-box" ref="imageBox">
    <div v-if="image" class="add-img-pic">
      <img :src="image" alt="" class="selected-img" />
      <div class="asset-icon">
        <!-- <icon-holder v-bind="circle" /> -->
        <icon-holder v-bind="gallery" @click="openGallery()" />
      </div>
    </div>

    <div class="add-img-pic" v-else>
      <img :src="triangleIcon" alt="" />
      <div class="asset-icon">
        <!-- <icon-holder v-bind="circle" /> -->
        <icon-holder v-bind="gallery" @click="openGallery()" />
      </div>
    </div>
  </div>
</template>

<script>
import IconHolder from "../IconHolder.vue";
export default {
  name: "ImageContainer",
  components: {
    IconHolder,
  },
  data() {
    return {
      addIcon: require("@/assets/icons/edit-2.svg"),
      triangleIcon: require("@/assets/icons/Group 254.svg"),
      gallery: {
        iconSrc: require("@/assets/icons/gallery-add.svg"),
      },
      circle: {
        iconSrc: require("@/assets/icons/maximize-circle.svg"),
      },
      title: "ایجاد مطلب جدید",
      image: false,
      imageAddres: ""
    };
  },
  methods: {

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
      this.$emit('imageChoose', this.imageAddres)
    },
    createImage(file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.add-new-story {
  justify-content: flex-start;
  padding: 10px;
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-right: 4.2vw;
  margin-top: 8vh;
}

.add-new-story h3 {
  margin-right: 1vw;
}

.img-box {
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 3vh;
  width: 80%;
  height: 50vh;
  border-radius: 5px;
  border: solid 2px rgba(0, 67, 105, 0.15);
  background-color: #fafcfc;
}

.add-img-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.add-img-pic img {
  display: block;
}

.asset-icon {
  width: 30%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

.selected-img {
  object-fit: cover;
  width: 100%;
  height: 50vh;
}
</style>
