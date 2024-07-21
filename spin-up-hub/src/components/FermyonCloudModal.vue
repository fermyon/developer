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
        <div class="header">
          <div class="title">Deploy {{ modalData.title }} to <br>Fermyon Cloud</div>
          <span @click="close" class="icon-close">
            <img src="/static/image/icon-close.svg" alt="Close" />
          </span>
        </div>
        <div class="content-container">
          <div v-if="!showInfo" class="image-container-with-icon">
            <span class="icon-back" @click="close">
                <img src="/static/image/icon-back.svg" alt="Back" />
              </span>
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
            <div class="icon-and-preview">
              <span class="icon-back" @click="goBack">
                <img src="/static/image/icon-back.svg" alt="Back" />
              </span>
              <div class="container">
                <div class="container-title">Before You Deploy</div>
                <div class="container-info">
                  You’ll need to install <a href="https://developer.fermyon.com/spin/v2/install" target="_blank">Spin</a> - our open source developer tool - and have a
                  <a href="https://cloud.fermyon.com/login" target="_blank">Fermyon Cloud</a> account (free) to deploy the application to.
                </div>
                <div class="section">
                  <div class="container-sub">1) Clone the Repo</div>
                  <div class="code-block">
                    <code>$ {{ modalData.url }}</code>
                  </div>
                </div>
                <div class="container-info">
                  2) Change your current directory to project directory.
                </div>
                <div class="section">
                  <div class="container-sub">3) Deploy</div>
                  <div class="code-block">
                    <code>$ spin cloud deploy</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.title {
  font-size: 1.75rem;
}

.icon-close {
  cursor: pointer;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
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

.content-container {
  height: 100%;
}

.image-container-with-icon {
  display: flex;
  align-items: center;
  margin-top: -30px;
}

.image-container-with-icon span {
  margin-bottom: 6rem;
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

.image-container img:hover {
  transform: scale(1.05); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); 
}

.additional-content {
  height: calc(100% - 2.25rem - 2rem);
  overflow-y: auto;
  margin-top: 20px;
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

.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    line-height: 1rem;
 
}

.container-title {
    color: black;
    font-size: 1.2rem;
}

.container-info {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-top: 20px;
    margin-bottom: 20px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.section {
    margin-top: 0;
    padding: 0;
}

.container-sub {
    font-size: 1.2rem;
    line-height: 2;
}

.code-block {
    background-color: #213c67;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 10px;
}

code {
    background-color: transparent;
    padding: 0;
    color: white;
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

@media screen and (max-width:768px) {
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
        .container {
          background-color: lighten(#202644, 5%);

          .container-title {
            color: white;
          }
          .container-info {
            color: white;
          }
          .container-sub {
            color: white;
          }
          .code-block {
            background-color: lighten(#202644, 10%);
          }
          code {
            color: white;
          }
        }
      }
    }
  }   
}
</style>



