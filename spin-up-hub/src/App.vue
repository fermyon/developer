<script>
</script>

<template>
  <div class="main hub">
    <router-view />
  </div>
</template>

<style lang="scss">

body.hub {
  width: 100%;
  font-size: 16px;
  background: $docsbg1;

  &:after {
    border-radius: 68.4375rem;
    position: fixed;
    right: -34rem;
    bottom: -32rem; 
    z-index: 10;
    content: " ";
    display: block;
    width: 68.4375rem;
    height: 68.4375rem;
    opacity: 1;
    background: rgba(230, 210, 241, 0.5);
    filter: blur(5rem);
    //background blur in bottom right
  }

  #topbar.navbar {
    .has-dropdown {
      .navbar-link {
        font-weight: normal !important;
      }
    }

    .navbar-menu {
      a.navbar-item {
        border-radius: 0.6875rem;

        &.is-active {
          font-weight: 500 !important;
          background: rgba(124, 109, 185, 0.125) !important;
        }

        &.button {
          border-radius: 2rem;
        }
      }
    }
  }

  main {
    .button {
      display: block;
      font-family: $spaceGro;
      margin: 0.125rem 12.5% 0 0;
      line-height: 1.75;
      @include button;

      &:hover {
        background: $seagreen;
      }
    }
  }

  &.modal-open {
    height: 100%;
    overflow: hidden;
  }

  .main {
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 300;
  }

  .container {
    width: 94vw;
    margin-left: auto;
    margin-right: auto;
  }

  footer.footer-links,
  footer.footer-links .level {
    z-index: 720;
    position: relative;
  }
}

html.dark-theme body.hub {
  background: darken($oxforddark, 2.5%) !important;

  &:after {
    opacity: 0.2;
    background: rgba(230, 210, 241, 0.27);
  }

  main {
    .button {
      color: $oxforddark !important;
    }
  }
  
  footer.footer-links .level a {
    color: white;
  }
}

@media screen and (min-width:1024px) {
  .content-listing {

    // fancy cards 
    .columns > .column {
      &:first-of-type a.card {
          background-size: 33rem !important;
          height: 24rem;
          max-height: 22rem;
      }

      &:nth-of-type(2) a.card {
          background-size: 33rem !important;
          height: 24rem;
          max-height: 22rem;
      }

      &:nth-of-type(3) a.card {
          background-size: 33rem !important;
          height: 24rem;
          max-height: 22rem;
      }

      &:first-of-type,
      &:nth-of-type(2),
      &:nth-of-type(3) {
        a.card {
          header {
            max-height: 1rem;
          }
          .summary {
            max-height: 5rem;
          }
          article h3 {
            color: $oxforddark;
            margin-bottom: 1rem;
          }
          .tags {
            margin-top: 1rem;
          }
          .tags span {
            color: darken($lavenderdark, 33%);
          }
        }
      }
    }
  }
}

@media screen and (max-width:1023px) {
  body.hub { 
    .container {
      width: 90vw;
      margin-left: 5vw;
      margin-right: 5vw;
    }

    main .content-filters {
      a.button {
        margin-right: 0;
      }
    }

    .content-listing {
      .columns .column {
        &:first-of-type a.card {
          background-size: 40rem !important;
          height: 24rem;
          max-height: 22rem;
        }
        &:nth-of-type(2) a.card {
          background-size: 40rem !important;
          height: 24rem;
          max-height: 22rem;
        }

        &:first-of-type,
        &:nth-of-type(2) {
          a.card {
            article h3 {
              color: $oxforddark;
            }
            .tags span {
              color: lighten($lavenderfloral, 7.5%);
            }
          }
        }
        &:nth-of-type(3) {
          a.card {
            .card-image {
              display: none;  // Hide the image only
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width:768px) {
  body.hub { 
    .container {
      width: 90vw;
      margin-left: 5vw;
      margin-right: 5vw;
    }

    .content-listing {
      .columns {
        .column:first-of-type > a.card {
          background-size: 60rem !important;
          height: 24rem;
          max-height: 22rem;
        }
        .column:nth-of-type(2) > a.card {
          background-size: 60rem !important;
          height: 24rem;
          max-height: 22rem;
        }
      }
    }
  }
}

html.dark-theme {
  body.hub {
    .main {
      .content-listing {
        .columns .column {
          &:first-of-type,
          &:nth-of-type(2),
          &:nth-of-type(3) {
            a.card {
              article h3 {
                color: white;
              }
              .tags span {
                color: lighten($lavenderfloral, 7.5%);
              }
            }
          }
        }
      }
    }
  }
}
</style>  