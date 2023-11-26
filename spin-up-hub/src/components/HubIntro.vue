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
    document.onkeydown = function (e) {
      if (e.key == "s" || e.key == "S") {
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
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-fifths-desktop is-full-mobile">

          <div class="search-box has-text-centered">
            <h1 class="description">
              WELCOME TO THE
              <code>
                  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.5745 2.41183C10.8569 2.41183 10.1567 2.47974 9.47625 2.6046C9.45 2.60898 9.42811 2.58927 9.42811 2.56298V0.105148C9.42811 0.0481928 9.38217 0 9.32309 0H6.70405C6.64716 0 6.59902 0.0460022 6.59902 0.105148V3.50931C6.59902 3.52464 6.59027 3.53998 6.57496 3.54655C2.68687 5.41292 0 9.39321 0 14C0 18.6068 2.68687 22.5849 6.57496 24.4534C6.59027 24.46 6.59902 24.4754 6.59902 24.4907V27.8949C6.59902 27.9518 6.64497 28 6.70405 28H9.32309C9.37998 28 9.42811 27.954 9.42811 27.8949V25.4348C9.42811 25.4085 9.45218 25.3888 9.47625 25.3932C10.1567 25.5181 10.8569 25.586 11.5745 25.586C17.9679 25.586 23.1491 20.3987 23.1491 13.9978C23.1491 7.59693 17.9657 2.41183 11.5745 2.41183ZM2.72407 14C2.72407 10.988 4.23379 8.32421 6.53338 6.7207C6.56183 6.70099 6.60121 6.7207 6.60121 6.75575V21.2443C6.60121 21.2793 6.56183 21.299 6.53338 21.2793C4.23379 19.678 2.72407 17.012 2.72407 14V14ZM12.5548 22.8083C11.4958 22.9244 10.4718 22.8499 9.50907 22.6177C9.46093 22.6068 9.42811 22.563 9.42811 22.5148V5.4874C9.42811 5.43921 9.46093 5.3954 9.50907 5.38445C10.172 5.22453 10.8634 5.1391 11.5767 5.1391C16.6332 5.1391 20.7138 9.40635 20.4119 14.5345C20.1603 18.8105 16.8083 22.3417 12.557 22.8083H12.5548Z" fill="#0E092D"/></svg> 
                  SPIN UP
                </code>
              HUB
            </h1>

            <div class="search-wrap">
              <input id="hub-search-input" v-model="searchTerm" class="search-input plausible-event-name=hub-search-input" @focus="loadSearchData" type="text"
                placeholder="Search for Spin app templates, plugins and examples" /><span class="search-icon"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hub-intro {
  padding-top: 2rem;
  padding-bottom: 3.67rem;

  .search-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: .5rem 2rem 2.5rem;
    border-radius: 1.5rem;
    border: 1px solid darken($lavendermid, 3.5%);
    background: linear-gradient(180deg, darken($docsbg1, 2%) 0%, darken($docsbg1, 1%) 100%);
    box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.02);
    z-index: 600;

    h1.description {
      font-family: $spaceGro;
      color: lighten($bluedark, 5%);
      @include upperCase;
      margin: 1.33rem 0 1rem;
      font-weight: 400 !important;
      font-size: 1.25rem;

      code {
        font-family: $mono;
        color: $oxforddark;
        font-size: 1.25rem;
        background: rgba($lavendermid, 0.05);
        border-radius: 0.33em;
        letter-spacing: 0.05rem;
        font-weight: 400;
        position: relative;
        padding: 0 0 0 2rem;
        display: inline-block;
        margin: 0 0.5rem;
        justify-content: center;

        svg {
          fill: white !important;
          display: inline-block;
          max-height: 1.5rem;
          position: absolute;
          top: 0.125rem;
          left: 0rem;
        }
      }
    }

    .search-wrap {
      width: auto;
      min-width: 88%;
      position: relative;

      .search-input {
        margin-top: 1rem;
        border: none;
        padding: 1rem 4rem 1rem 2rem;
        border-radius: 2rem;
        width: 100%;
        border-radius: 3.75rem;
        border: 1px solid rgba(137, 103, 194, 0.5);
        color: darken($lavenderdark, 12.5%);
        font-size: 1rem;
        font-family: $spaceGro;
        background: linear-gradient(180deg, #F6F4FE 0%, #FBFBFC 100%);
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &::placeholder {
          color: darken($lavenderdark, 12.5%);
        }
      }

      .search-icon {
        background: url(../static/image/icon-search.svg) no-repeat 0 0;
        position: absolute;
        right: 1.5rem;
        top: 2.25rem;
        width: 1rem;
        height: 1rem;
        content: " ";
        display: inline-block;
      }
    }

    h2 {
      margin: 1.333rem auto 1rem;
      font-size: 1em;
      color: rgba($darkblue, 0.8);
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
      h1.description {
        font-size: 1rem;

        code {
          font-size: 1.1rem;
          word-wrap: none;
        }
      }
    }
  }
}

.dark-theme {
  .hub-intro {
    background: #0C0823;
  }

  .search-box {
    border-color: #384687;
    background: linear-gradient(105deg, rgba(154, 103, 194, 0.21) 0%, rgba(124, 109, 185, 0.21) 100%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);


    h1.description {
      color: $thistle;

      code {
        background: rgba($lavenderdark, 0.02);
        color: white;

        svg,
        path {
          fill: white !important;
        }
      }
    }

    .search-wrap {
      input.search-input {
        border-radius: 3.75rem;
        border: 1px solid #8967C2;
        background: linear-gradient(180deg, #171135 0%, #0C0725 100%);
        color: white;

        &::placeholder {
          color: white;
        }
      }

      .search-icon {
        background: url(../static/image/icon-search-dark.svg) no-repeat 0 0;
      }
    }

    h2 {
      color: rgba($thistle, 0.7);
    }
  }
}</style>
