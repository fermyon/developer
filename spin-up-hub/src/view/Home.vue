<script>
import HubIntro from '../components/HubIntro.vue'
import ContentSpace from '../components/ContentSpace.vue'
import PreviewModal from '../components/PreviewModal.vue'

export default {
  components: { HubIntro, ContentSpace, PreviewModal },
  async mounted() {
    if (this.$route.name == "Preview") {
      this.$store.commit("openPreview", this.$route.params.id)
    }
    await this.$store.dispatch("getContentInfo")
    if (this.$route.name == "Preview") {
      this.$store.commit("loadModalMeta", this.$route.params.id)
      this.$store.dispatch("getPreviewData")
    }
  }
}
</script>

<template>
  <HubIntro />
  <ContentSpace />
  <PreviewModal />
</template>

<style></style>
