<script>
</script>

<template>
  <div class="main" >
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
</style>
