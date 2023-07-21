<script>
export default {
  data() {
    return {
      test: [1, 2, 3]
    }
  },
  methods: {
    isActiveContentType(type) {
      return this.filteredContentTypes.includes(type) ?  "active" : false
    },
    isActiveLanguage(type) {
      return this.filteredLanguages.includes(type) ?  "active" : false
    },
    toggleContentFilter(type) {
      this.$store.commit("updateContentTypeFilter", type)
    },
    toggleLanguageFilter(type) {
      this.$store.commit("updateLanguageFilter", type)
    }
  },
  computed: {
    contentTypes() {
      return this.$store.state.contentTypes
    },
    languages() {
      return this.$store.state.languages
    },
    filteredContentTypes() {
      return this.$store.state.contentFilters
    },
    filteredLanguages() {
      return this.$store.state.languageFilters
    }
  }
}

</script>

<template>
  <div class="content-filters">
    <div class="filter-category"> Content Types:</div>
    <span v-for="item in contentTypes" class="tag" v-bind:class="isActiveContentType(item)" @click="toggleContentFilter(item)">{{ item }}</span>
    <div class="filter-category"> Languages:</div>
    <span v-for="item in languages" class="tag" v-bind:class="isActiveLanguage(item)" @click="toggleLanguageFilter(item)">{{ item }}</span>
  </div>
</template>
<style lang="scss" scoped>
.content-filters {
  width: 20%;
  min-width: 20%;
  padding-left: 3rem;

  .filter-category{
    margin-top: 2rem;
    font-size: 0.9rem;
    color: $lightplum;
    width: 100%;
    text-align: center;
    display: flex;
    cursor: default;
  }
  .tag {
    display: inline-block;
    font-size: 0.9rem;
    margin: 0.2rem;
    border-radius: 0.67rem;
    padding: 0.2rem 0.4rem;
    background-color: $lightplum;
    cursor: pointer;
    &.active {
      background-color: $seagreen;
    }
  }
}

@media screen and (max-width:1023px) {
        .content-filters {
            padding-left: 0;
            padding-right: 0;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .filter-category {
              width: 100%;
              display: flex;
              justify-content: center;
            }
        }
}
</style>