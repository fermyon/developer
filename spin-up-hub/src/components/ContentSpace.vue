<script>
import ContentFilter from './ContentFilter.vue'
import ContentListing from './ContentListing.vue'
export default {
    components: { ContentFilter, ContentListing }
}
</script>

<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="columns is-centered is-0 is-mobile is-multiline hub-wrapper">
                <ContentFilter />
                <ContentListing />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.content-wrapper {
    width: 100%;
    display: flex;
    flex-grow: 1;
    border-top: 1px solid rgba($thistle, 1);
    background: linear-gradient(180deg, darken($docsbg1, 1.5%) 0%, rgba($docsbg1, 0.1) 100%);
    padding-top: 1.825rem;
    padding-bottom: 3rem;
    z-index: 500;
    position: relative;
}

.dark-theme {
    .content-wrapper {
        border-color: darken($bluedark, 10%);
        background: linear-gradient(180deg, rgba(230, 210, 241, 0.05) 0%, rgba(230, 210, 241, 0.00) 100%);
    }
}

@media screen and (max-width:1023px) {

}
</style>