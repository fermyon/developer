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
  <div class="content-filters column is-one-fifth-desktop is-full-touch">

    <div class="contribute">
        <a class="button is-primary is-rounded is-medium" href="/hub/contributing">Add New</a>
    </div>
        
    <div class="filter-category">Resource Types:</div>
    <div v-for="item in contentTypes" class="tag" v-bind:class="isActiveContentType(item)" @click="toggleContentFilter(item)">
      <a>{{ item }}</a>
    </div>

    <div class="filter-category"> Languages:</div>
    <div v-for="item in languages" class="tag" v-bind:class="isActiveLanguage(item)" @click="toggleLanguageFilter(item)">
      <a>{{ item }}</a>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.content-filters {
  z-index: 550;
  position: relative;

  .filter-category {
    margin-top: 2.333rem;
    padding: 0.5rem 5% 0.5rem 0;
    font-size: 0.75rem;
    color: darken($lavendermid, 20%);
    width: 100%;
    text-align: center;
    display: flex;
    cursor: default;
    @include upperCase;
  }
  .tag {
    margin: 0 0 0.15rem -0.5rem;
    padding: 0;
    background: transparent;
    height: auto;
    display: block;

    a {
      display: inline-block;
      line-height: 1.4;
      font-size: 1rem;
      border-radius: 1rem !important;
      padding: 0.15rem 0.67rem;
      background-color: transparent;
      color: $bluecallout;
      height: auto;
      width: auto;
      cursor: pointer;
      transition: backround 0.3s ease-in-out 0;

      &:hover {
        background-color: white;
        color: $bluedark;
      }
    }
    &.active a {
      background-color: darken($docsbg1, 5%);
      padding-right: 2rem;
      position: relative;

      &:after {
        display: inline-block;
        content: "\00d7"; /* This will render the 'X' */
        width: 1rem;
        font-size: 2em !important;
        height: 1rem;
        margin-left: 0.5rem;
        position: absolute;
        right: 0.6rem;
        top: -0.5925rem;
        color: white;
      }
    }
  }
}

.dark-theme {
  .content-filters {
    .tag { 
      a {
        color: $thistle;

        &:hover {
          background: rgba($lavenderdark, 0.35);
          // color: $bluedark;
          color: white;
        }
      }
      
      &.active a {
        background: rgba($lavenderdark, 0.35);
        color: white;

        &:after {
          color: $oxforddark !important;
        }
      }
    }
  }
}

@media screen and (max-width:1023px) {

  .button {
    margin: 0.125rem auto;
  }
}
</style>