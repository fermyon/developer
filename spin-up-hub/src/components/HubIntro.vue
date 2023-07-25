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
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-fifths-desktop is-full-mobile">

          <div class="search-box has-text-centered">
            <h1 class="description">WELCOME TO THE <code><img aria-multiline="Spin" src="/static/image/spin.svg" alt="Spin Icon">&nbsp;SPIN UP</code> EXAMPLE HUB</h1>
            <input class="search-input" type="text" placeholder="Explore the fermyverse" />
            <h2>Search for spin app templates, plugins and examples.</h2>
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
    padding: .5rem 2rem;
    border-radius: 1.5rem;
    border: 1px solid darken($lavendermid, 3.5%);
    background: linear-gradient(180deg, darken($docsbg1, 2%) 0%, darken($docsbg1, 1%) 100%);
    box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.05);
    z-index: 600;

    h1.description {
      font-family: $spaceGro;
      color: $bluedark;
      @include upperCase;
      margin: 1.33rem 0 1rem;
      font-weight: 500 !important;
      font-size: 1.25rem;

      code {
        font-family: $mono;
        color: $bluedark;
        font-size: 1.25rem;
        background: rgba($lavendermid, 0.35);
        border-radius: 0.33em;
        letter-spacing: 0.05rem;
        font-weight: 400;
        position: relative;
        padding-left: 2rem;

        img {
          fill: white !important;
          position: absolute;
          top: -2.1rem;
          left: 0.67rem;
          margin-top: 2.25rem;
        }
      }
    }
    .search-input {
      margin-top: 1rem;
      border: none;
      padding: 1rem 2rem;
      border-radius: 2rem;
      width: 80%;
      border-radius: 3.75rem;
      border: 1px solid rgba(137, 103, 194, 0.5);
      color: $bluecallout;
      font-size: 1rem;
      font-family: $spaceGro;
      background: linear-gradient(180deg, #F6F4FE 0%, #FBFBFC 100%);
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
    border-color:#384687;
    background: linear-gradient(105deg, rgba(154, 103, 194, 0.21) 0%, rgba(124, 109, 185, 0.21) 100%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    h1.description {
      color: $thistle;

      code {
        background: rgba($lavenderdark, 0.1);
        color: $thistle;
      }
    }

    .search-input {
      border-radius: 3.75rem;
      border: 1px solid #8967C2;
      background: linear-gradient(180deg, #171135 0%, #0C0725 100%);
    }

    h2 {
      color: rgba($thistle, 0.7);
    }
  }
}
</style>
