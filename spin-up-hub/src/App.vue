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

    }

    .navbar-menu {
      a.navbar-item {
        border-radius: 0.6875rem;

        &.is-active {
          font-weight: 600 !important;
          background: rgba(124, 109, 185, 0.125) !important;
        }
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
}
</style>
