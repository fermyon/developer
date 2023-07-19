<script>
import TopBar from '../components/TopBar.vue'
import ContentSpace from '../components/ContentSpace.vue'
import PreviewModal from '../components/PreviewModal.vue'

export default {
  components: { TopBar, ContentSpace, PreviewModal },
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
  <TopBar />
  <ContentSpace />
  <PreviewModal />
</template>

<style></style>
