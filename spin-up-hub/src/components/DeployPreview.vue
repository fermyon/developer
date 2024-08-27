<script>
import CloudModal from './FermyonCloudModal.vue';

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
  mounted() {
    window.addEventListener('popstate', this.onPopState);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.onPopState);
  },
  methods: {
    close() {
      this.showInfo = false;
      this.showCloudModalComponent = false;
      this.$emit('close');
      window.history.pushState({ modalOpen: false }, "");
    },
    showCloudModal() {
      this.showInfo = true;
      window.history.pushState({ modalOpen: true, modalType: 'info' }, ""); 
    },
    goBack() {
      this.showInfo = false; 
    },
    showCloudModal2() {
      this.showCloudModalComponent = true;
      window.history.pushState({ modalOpen: true, modalType: 'cloud' }, "");
    },
    hideCloudModal() {
      this.showCloudModalComponent = false;
    },
    onPopState(event) {
      if (event.state && event.state.modalOpen) {
        if (event.state.modalType === 'info') {
          this.showInfo = true;
          this.showCloudModalComponent = false;
        } else if (event.state.modalType === 'cloud') {
          this.showCloudModalComponent = true;
          this.showInfo = false;
        }
      } else {
        this.close(); // Close the modal if state doesn't indicate it's open
      }
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
    return this.showInfo 
      ? `Deploy ${this.modalData.title} to Kubernetes:` 
      : `Deploy ${this.modalData.title} to:`;
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
          <span class="wasm-logo">
            <img src="/static/image/wasm.png" alt="Logo" />
          </span>
          <div class="title">{{ titleText }}</div>
          <span @click="close" class="icon-close">
              <img src="/static/image/icon-close.svg" alt="Close" />
          </span>
        </div>
        <div class="content-container">
          <div v-if="!showInfo" class="image-container">
            <img src="/static/image/to-kubernetes.png" alt="Image 1" @click="showCloudModal" />
            <img src="/static/image/to-cloud.png" alt="Image 2" @click="showCloudModal2" />
          </div>
          <div v-if="showInfo" class="additional-content">
            <div class="icon-and-preview">
              <span class="icon-back" @click="goBack">
                <img src="/static/image/icon-back.svg" alt="Back" />
              </span>
              <div class="container-information">
                <div class="container-title">Before You Deploy</div>
                <div class="container-info">
                  <p>You’ll need to configure <a href="https://www.spinkube.dev/" target="_blank">SpinKube</a> - our open-source developer tool for running Wasm app workloads in Kubernetes, and the necessary prerequisites documented
                  <a href="https://www.spinkube.dev/docs/install/quickstart/" target="_blank">here</a></p> 
                </div>
                <div class="section">
                  <div class="container-sub">Deploy</div>
                  <div class="code-block">
                    <div class="code-snippet">kubectl apply -f {{ modalData.yaml }}</div>
                  </div>
                </div>
                <div class="resources-title">Further Resources</div>
                 <div class="resources-container">
                    <div class="resource-card">
                      <a href="https://www.spinkube.dev/" target="_blank">SpinKube.dev</a> is a cloud-native community project that provides a self-service way to bring Wasm workloads to your Kubernetes.
                    </div>
                    <div class="resource-card">
                      <a href="https://fermyon.com/" target="_blank">Fermyon Platform for Kubernetes</a> is an easy-to-use platform for teams, extending SpinKube with features & performance benefits.
                    </div>
                  </div>
              </div>  
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
  top: 1rem;
  right: 1rem;
  cursor: pointer;
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


.content-container {
  height: 100%;
  margin-left: 1.2rem;
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
}

.container-information {
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

.section {
    margin-top: 0;
    padding: 0;
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
    white-space: nowrap; 
    display: block;
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
  margin-right: 20px;
  margin-top: 18px;
  cursor: pointer;
}

.icon-back img {
  width: 1.5rem;
  height: 1.5rem;
}
.resources-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px 0; 
}

.resources-title {
    font-size: 1.2rem;
    line-height: 2;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: -1rem;
}

.resource-card {
  flex: 0 0 48%; 
  padding: 15px;
  border: 1px solid #A87CE6; 
  border-radius: 10px;
  background-color: #FDF8FF; 
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
  transition: transform 0.3s, box-shadow 0.3s;
  font-size: 1rem; 
  line-height: 1.5; 
  margin-top: 0; 
  margin-bottom: 20px;
}

.resource-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.resource-card a {
  color: #007bff; 
  font-weight: bold;
  text-decoration: none;
}

.resources-container .resource-card + .resource-card {
  margin-left: 10px; 
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
        .container-information {
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
          .resources-title {
            color: white;
          }
          .code-block {
            background-color: lighten(#19143e, 10%);
          }
          .resource-card {
            background-color: lighten(#0e092d, 5%);
            border-color: #202644 !important;
            color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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

