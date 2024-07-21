<script>
import CloudModal from './FermyonCloudModal.vue';
import { nextTick } from "vue"
import { unescapeHTML } from "../store"

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showInfo: false,
      showCloudModalComponent: false,
      deployPreview: ""
    };
  },
  async mounted() {
    let res = await fetch(import.meta.env.VITE_API_HOST + "/api/hub/spinkube_deploy")
    this.deployPreview = unescapeHTML(await res.text())
    nextTick(() => {
      document.querySelectorAll("pre > code").forEach((codeblock) => {
        codeblock.classList.add("hljs")
      })
      addCopyButtons()
      addAnchorLinks()
    })
  },
  methods: {
    close() {
      this.$emit('close');
      this.showInfo = false; 
    },
    showCloudModal() {
      this.showInfo = true;
    },
    goBack() {
      this.showInfo = false; 
    },
    showCloudModal2() {
      this.showCloudModalComponent = true;
    },
    hideCloudModal() {
      this.showCloudModalComponent = false;
    }
  },
  components: {
    CloudModal
  },
  computed: {
    modalData() {
      return this.$store.state.modalData;
    },
    verified() {
      return this.modalData.author == "fermyon";
    },
    titleText() {
      return this.showInfo ? `Deploy ${this.modalData.title} to kubernetes:` : `Deploy ${this.modalData.title} to:`;
    }
  },
}
</script>


<template>
  <div v-if="isOpen && !showCloudModalComponent" class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box" :class="{ 'expanded': showInfo }">
        <div class="header">
          <div class="title">{{ titleText }}</div>
          <span @click="close" class="icon-close">
            <img src="/static/image/icon-close.svg" alt="Close" />
          </span>
        </div>
        <div class="content-container">
          <div v-if="!showInfo" class="image-container">
            <img src="https://i.postimg.cc/j2FHT4Mg/to-kubernetes.png" alt="Image 1" @click="showCloudModal" />
            <img src="https://i.postimg.cc/PNnq1LJf/to-cloud.png" alt="Image 2" @click="showCloudModal2" />
          </div>
          <div v-if="showInfo" class="additional-content">
            <div class="icon-and-preview">
              <span class="icon-back" @click="goBack">
                <img src="/static/image/icon-back.svg" alt="Back" />
              </span>
              <section class="type" v-html='this.deployPreview'></section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
  <CloudModal v-if="showCloudModalComponent" @close="hideCloudModal" />
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2001;
}

.modal-content {
  position: relative;
  z-index: 2002;
  width: 90vw;
  max-width: 700px;
  border-radius: 20px;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2003;
}

.icon-close {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  cursor: pointer;
}

.box {
  width: 100%;
  overflow: hidden;
  background-color: #FDF8FF;
  border-radius: 20px;
}

.box:not(.expanded) {
  height: 45vh;
  margin-bottom: 50px;
  margin-top: 35px;
}

.box.expanded {
  height: 70vh;
  margin-top: 150px;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.75rem;
}

.content-container {
  height: 100%;
}

.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 10px;
}

.image-container img {
  max-width: 48%;
  width: 500px;
  cursor: pointer;
  height: 180px;
  border: 1px solid #A87CE6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.image-container img:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.additional-content {
  height: calc(100% - 2.25rem - 2rem);
  overflow-y: auto;
  margin-top: 20px;
}

.type {
  font-size: 1.2rem;
  padding: 10px;
  line-height: 2;
}

.icon-content-container {
  display: flex;
  align-items: flex-start;
}

.icon-and-preview {
  display: flex;
  align-items: flex-start;
}

.icon-back {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.icon-back img {
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 1220px) {
  .box:not(.expanded) {
    height: auto;
  }
}

@media screen and (min-width:1024px) {
  .box:not(.expanded) {
  height: auto;
  }
}


@media screen and (max-width: 1023px) {
  .box:not(.expanded) {
  height: auto;
  }
}

html.dark-theme {
  body.hub {
    .main {
      .modal {
        .box {
          background-color: lighten(#202644, 5%);
          border-color: #202644 !important;
        }
        .title {
          color: white;
        }
        .image-container img {
          border: 1px solid #fff;
          border-color: #202644 !important;
        }
        .additional-content {
          background-color: lighten(#202644, 5%);
        }
      }
    }
  }
}
</style>

