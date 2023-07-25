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
          background: url(../static/image/gradient-blue-green.jpg) no-repeat -8rem -1rem !important;
          background-size: 33rem !important;
      }

      &:nth-of-type(2) a.card {
          background: url(../static/image/gradient-pink-purple.jpg)  no-repeat -10rem -1rem !important;
          background-size: 33rem !important;
      }

      &:nth-of-type(3) a.card {
          background: url(../static/image/gradient-pink-blue.jpg)  no-repeat -8rem -1rem !important;
          background-size: 33rem !important;
      }

      &:first-of-type,
      &:nth-of-type(2),
      &:nth-of-type(3) {
        a.card {
          article h3 {
            color: $oxforddark;
          }
          .tags span {
            color: darken($lavenderdark, 33%);
          }
        }
      }
    }
  }

  .dark-theme {
    .content-listing {

      // fancy cards 
      .columns > .column {
        &:first-of-type,
        &:nth-of-type(2),
        &:nth-of-type(3) {
          a.card {

            .category {
              background: white;
              color: $bluedark;

              svg {
                fill: $bluedark;
              }
            }

            article {
              h3 {
                color: $oxforddark;
              }

              .summary { 
                color: $bluecallout;
              }
            }
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
          background: url(../static/image/gradient-blue-green.jpg) no-repeat -8rem -1rem !important;
          background-size: 40rem !important;
        }
        &:nth-of-type(2) a.card {
          background: url(../static/image/gradient-pink-purple.jpg)  no-repeat -10rem -1rem !important;
          background-size: 40rem !important;
        }

        &:first-of-type,
        &:nth-of-type(2) {
          a.card {
            article h3 {
              color: $oxforddark;
            }
            .tags span {
              color: darken($lavenderdark, 33%);
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
          background: url(../static/image/gradient-blue-green.jpg) no-repeat -8rem -1rem !important;
          background-size: 60rem !important;
        }
        .column:nth-of-type(2) > a.card {
          background: url(../static/image/gradient-pink-purple.jpg)  no-repeat -10rem -1rem !important;
          background-size: 60rem !important;
        }
      }
    }
  }

  .dark-theme {
    .content-listing {

      // fancy cards 
      .columns > .column {
        &:first-of-type,
        &:nth-of-type(2) {
          a.card {

            .category {
              background: white;
              color: $bluedark;

              svg {
                fill: $bluedark;
              }
            }

            article {
              h3 {
                color: $oxforddark;
              }

              .summary { 
                color: $bluecallout;
              }
            }
          }
        }
      }
    }
  }
}
</style>