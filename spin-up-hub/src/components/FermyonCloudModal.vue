<script>
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
      <div class="box" :class="{ 'expanded': showInfo }">
        <div class="header">
          <span class="wasm-logo">
              <img src="/static/image/wasm.png" alt="Logo" />
          </span>
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
                <img src="/static/image/to-terminal.png" alt="Image 1" />
              </a>
              <a v-if="modalData.artifactSource" :href="`https://cloud.fermyon.com/deploy?artifact=` + modalData.artifactSource + `${this.$store.state.deployUTM}`">
                <img src="/static/image/to-ui.png" alt="Image 2" />
              </a>
            </div>
          </div>
          <div v-if="showInfo" class="additional-content">
            <div class="icon-and-preview">
              <span class="icon-back" @click="goBack">
                <img src="/static/image/icon-back-copy.svg" alt="Back" />
              </span>
              <div class="container">
                <div class="container-title">Before You Deploy</div>
                <div class="container-info">
                  You’ll need to install <a href="https://spinframework.dev/v2/install" target="_blank">Spin</a> - our open source developer tool - and have a
                  <a href="https://cloud.fermyon.com/login" target="_blank">Fermyon Cloud</a> account (free) to deploy the application to.
                </div>
                <div class="section">
                  <div class="container-sub">Deploy from terminal</div>
                  <div class="code-block">
                    <div class="code-snippet">$ spin cloud deploy -f {{ modalData.artifactSource }}</div>
                  </div>
                </div>
                <div class="container-info">Visit <a href="https://cloud.fermyon.com">your Cloud dashboard</a> to view and manage your deployment of {{ modalData.title }}</div>
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
  position: relative;
  display: flex;
  align-items: center; 
  justify-content: flex-start;
  margin-left: 1rem;
}

.wasm-logo {
  position: absolute;
  top: -0.1rem;
  left: -1rem;
}

.wasm-logo img {
  width: 50px;
  height: 50px;
}

.title {
  flex-grow: 1; 
  font-size: 1.6rem;
  margin-top: 0.6rem;
  margin-left: 40px;
}

.icon-close {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2003;
}

.box {
  position: relative;
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
}

.icon-and-preview {
  display: flex;
  align-items: flex-start;
}

.icon-back {
  display: inline-block;
  margin-right: 15px;
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
    padding-left: 0;
    border-radius: 8px;
    line-height: 1rem;
}

.container-title {
    color: black;
    font-size: 1.2rem;
    font-weight: bold;
}

.container-info {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-top: 20px;
    margin-bottom: 20px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    color: black; 
}

.section {
    margin-top: 0;
    padding: 0;
    margin-bottom: 1.5rem;
}

.container-sub {
    font-size: 1.2rem;
    line-height: 2;
    font-weight: bold;
}

.code-block {
    background-color: #19143e;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 10px;
    overflow-x: auto;
    max-width: 100%;
}

.code-snippet {
    background-color: transparent;
    padding: 10px;
    color: white;
    white-space: nowrap; /* Prevents line wrapping */
    display: block;
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
            background-color: lighten(#19143e, 10%);
          }
          a {
            color: #007bff;
          }
          a:hover {
            color: white; 
          }
        }
      }
    }
  }   
}
</style>



