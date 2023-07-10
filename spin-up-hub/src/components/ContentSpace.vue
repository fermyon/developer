<script>
import ContentFilter from './ContentFilter.vue'
import ContentListing from './ContentListing.vue'
export default {
    components: { ContentFilter, ContentListing }
}
</script>

<template>
    <div class="content-wrapper">
        <ContentFilter />
        <ContentListing />
    </div>
</template>
<style lang="scss" scoped>
.content-wrapper {
    width: 100%;
    display: flex;
    flex-grow: 1;
    margin-top: 2rem;
    background-color: $darkspace;
}

@media screen and (max-width:1023px) {
    .content-wrapper {
        flex-direction: column;

    }
}
</style>