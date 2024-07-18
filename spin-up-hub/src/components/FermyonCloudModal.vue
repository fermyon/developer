<script>
import { nextTick } from "vue"
import { unescapeHTML } from "../store"
export default {
  data() {
    return {
      showInfo: false,
      deployPreview: ""
    };
  },
  async mounted() {
        let res = await fetch(import.meta.env.VITE_API_HOST + "/api/hub/terminal_deply")
        this.deployPreview = unescapeHTML(await res.text())
        nextTick(() => {
            document.querySelectorAll("pre > code").forEach((codeblock) => {
                console.log(codeblock)
                codeblock.classList.add("hljs")
            })
            addCopyButtons()
            addAnchorLinks()
        })
    },
  methods: {
    close() {
      this.$emit('close');
    },
    goBack() {
      this.showInfo = false;
    },
    displayAdditionalContent() {
      this.showInfo = true;
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modalData;
    },
    verified() {
      return this.modalData.author == "fermyon";
    }
  },
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box">
        <div class="title">Deploy {{ modalData.title }} to Fermyon Cloud</div>
        <div class="content-container">
          <div v-if="!showInfo" class="image-container-with-icon">
            <div class="image-container">
              <a href="#" target="_blank" @click.prevent="displayAdditionalContent">
                <img src="https://i.postimg.cc/G3gG4rCZ/to-terminal.png" alt="Image 1" />
              </a>
              <a v-if="modalData.artifactSource" :href="`https://cloud.fermyon.com/deploy?artifact=` + modalData.artifactSource + `${this.$store.state.deployUTM}`">
                <img src="https://i.postimg.cc/prjjNh6z/to-ui.png" alt="Image 2" />
              </a>
            </div>
          </div>
          <div v-if="showInfo" class="additional-content">
            <span class="icon-back" @click="goBack">
              <img src="/static/image/icon-back.svg" alt="Back" />
            </span>
            <section class="type" v-html='this.deployPreview'>
            </section>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<style lang="scss" scoped>
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
  right: 1.25rem;
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

.title {
  font-size: 1.75rem;
}

.icon-close {
  cursor: pointer;
  margin-top: -10px;
}

.content-container {
  height: 100%;
}

.image-container-with-icon {
  display: flex;
  align-items: center;
  margin-top: -30px;
}

.icon-back {
  margin-right: 10px;
  cursor: pointer;
  margin-top: -90px;
  width: 32px; 
  height: 32px; 
}



.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 10px;
}

.image-container img {
  max-width: 95%;
  width: 500px;
  cursor: pointer;
  height: 180px;
  border: 1px solid #A87CE6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
  border-radius: 10px;
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


