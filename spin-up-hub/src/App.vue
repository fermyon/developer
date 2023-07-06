<script>
import TopBar from './components/TopBar.vue'
import ContentSpace from './components/ContentSpace.vue'
import PreviewModal from './components/PreviewModal.vue'

export default {
  components: {TopBar, ContentSpace, PreviewModal},
}
</script>

<template>
  <div class="main" >
    <TopBar/>
    <ContentSpace />
    <PreviewModal />
  </div>
</template>

<style lang="scss">

body{
  width: 100%;
  
  &.modal-open {
    height: 100%;
    overflow: hidden;
  }
}

.main {
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
}
</style>
