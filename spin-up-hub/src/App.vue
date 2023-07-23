<script>
</script>

<template>
  <div class="main hub">
    <router-view />
  </div>
</template>

<style lang="scss">

body{
  width: 100%;
  &.modal-open {
    height: 100%;
    overflow: hidden;
  }
}

.main {
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

html.dark-theme body.documentation {
  background-color: darken($oxforddark, 2.5%) !important;

}

</style>
