<script>
import Card from "./Card.vue"
export default {
    data() {
        return {
        }
    },
    components: { Card },
    computed: {
        filteredContentTypes() {
            return this.$store.state.contentFilters
        },
        filteredLanguages() {
            return this.$store.state.languageFilters
        },
        contentItmes() {
            let data = this.$store.state.contentItems
            let contentFilterLength = this.filteredContentTypes.length
            let langaugeFilterLength = this.filteredLanguages.length
            if (contentFilterLength + langaugeFilterLength === 0) { return data }
            if (contentFilterLength === 0) {
                return data.filter(k => { return this.filteredLanguages.includes(k.language) })
            }
            if (langaugeFilterLength === 0) {
                return data.filter(k => { return this.filteredContentTypes.includes(k.category) })
            }
            return data.filter(k => {
                return this.filteredContentTypes.includes(k.category) && this.filteredLanguages.includes(k.language)
            })
        }
    },
    mounted() {
        this.$store.dispatch("getContentInfo")
    }
}

</script>

<template>
        <transition-group name="card-list" tag="div" class="content-listing" appear>
            <Card v-for="item in contentItmes" :item="item" v-bind:key="item.title"></Card>
        </transition-group>
</template>
<style lang="scss" scoped>
.content-listing {
    flex-grow: 1;
    min-height: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem;
}
.card-list-enter-active, .card-list-leave-active {
  transition: all 0.5s;
}
.card-list-leave-active {
    position: absolute;
}
.card-list-enter-from,
.card-list-leave-to
    {
    opacity: 0;
    scale: 0;
    transform: translateY(30px);
}

.card-list-move {
    transition: transform 0.5s;
}
</style>