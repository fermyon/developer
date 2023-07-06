<script>
export default {

}
</script>

<template>
  <div class="topbar">
    <div class="search-box">
      <div class="description">WELCOME TO THE SPIN UP HUB</div>
      <input class="search-input" type="text" placeholder="Explore the fermyverse">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  padding: 8rem 1rem 1rem 1rem;
  display: flex;
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
    background: $darkspace;
    padding: 1rem;

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
      border-radius: 0.67rem;
      width: 80%;
      background-color: $oxfordblue;
    }
  }
}

@media screen and (max-width:1023px) {
  .topbar {
    .search-box {
      width: 90%;
    }
  }
}
</style>
