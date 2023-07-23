<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    async loadSearchData() {
      if (!this.$store.state.loadedSearchData) {
        await this.$store.dispatch("loadSearchData")
        this.$store.state.loadedSearchData = true
      }
    }
  },
  computed: {
    loadedSearchData() {
      return this.$store.state.loadedSearchData
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm
      },
      set(value) {
        this.$store.commit("updateSearchTerm", value)
      }
    }
  },
  mounted() {
    console.log("here",  document.getElementById("hub-search-input"))
    document.onkeydown = function (e) {
      if (e.key == "s" || e.key == "S") {
        console.log("here")
        let seachBar = document.getElementById("hub-search-input")
        if (document.activeElement != seachBar) {
          e.preventDefault()
          seachBar.focus()
        }

      }
    };
  }
}
</script>

<template>
  <div class="hub-intro">
    <div class="search-box">
      <div class="description">WELCOME TO THE SPIN UP HUB</div>
      <input id="hub-search-input" class="search-input" v-model="searchTerm" @focus="loadSearchData" type="text"
        placeholder="Explore the fermyverse">
    </div>
    <div class="contribute">
      <a class="btn" href="/hub/contributing">Add Contribution</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hub-intro {
  padding: 8rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .search-box {
    width: 60%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.67rem;
    justify-content: center;
    background: lighten($thistle, 5%);
    padding: 1rem 0 3rem 0;

    .description {
      margin-top: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 1rem;
      text-align: center;
    }

    .search-input {
      margin-top: 1rem;
      border: none;
      padding: 1rem;
      border-radius: 2rem;
      width: 80%;
      background-color: $docsbg2;
    }

  }

  .contribute {
    width: 100vw;
    text-align: right;
    font-size: 1rem;
    padding: 2rem;
  }
}

@media screen and (max-width:1023px) {
  .hub-intro {
    .search-box {
      width: 90%;
    }
  }
}

.dark-theme {
  .search-box {
    background: linear-gradient(105deg, rgba(154, 103, 194, 0.21) 0%, rgba(124, 109, 185, 0.21) 100%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    .search-input {
      background-color: darken($oxforddark, 2.5%);
    }
  }
}
</style>
