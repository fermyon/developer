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
        searchIndex() {
            return this.$store.state.searchIndex
        },
        searchTerm() {
            return this.$store.state.searchTerm
        },
        contentItems() {
            let data = this.$store.state.contentItems
            if (this.searchTerm) {
                let updatedQuery = this.searchTerm
                    .split(" ")
                    .map(word => word + '^2 ' + word + '*')
                    .join(' ');
                let result = this.searchIndex.search(updatedQuery)
                //get only confident results
                let matches = []
                result.map(k => {
                    if (k.score < 5) {
                        return
                    }
                    matches.push(data.find(docs => k.ref == docs.id))
                })
                data = matches
            }
            let contentFilterLength = this.filteredContentTypes.length
            let langaugeFilterLength = this.filteredLanguages.length
            if (contentFilterLength + langaugeFilterLength === 0) { return data }
            if (contentFilterLength === 0) {
                return data.filter(k => { return this.filteredLanguages.includes(k.language) })
            }
            if (langaugeFilterLength === 0) {
                return data.filter(k => { return this.filteredContentTypes.includes(k.category) })
            }
            console.log(data.filter(k => {
                return this.filteredContentTypes.includes(k.category) && this.filteredLanguages.includes(k.language)
            }))
            return data.filter(k => {
                return this.filteredContentTypes.includes(k.category) && this.filteredLanguages.includes(k.language)
            })
        }
    }
}

</script>

<template>
    <div class="content-listing column is-four-fifths-desktop is-full-touch">
        <transition-group class="card-groups columns is-0 is-mobile is-multiline" tag="div"  name="card-list" appear>
            <Card v-for="item in contentItems" :item="item" :key="item.title"></Card>
        </transition-group>
        </div>
</template>

<style lang="scss" scoped>
.card-groups {
    width: 100%;
}
.content-listing {
    flex-grow: 1;
    min-height: 80%;
    display: flex;
    flex-wrap: wrap;
    z-index: 550;
    position: relative;
}

@media screen and (max-width:1023px) {

}

.card-list-enter-active,
.card-list-leave-active {
    transition: all 0.5s;
}

.card-list-leave-active {
    position: absolute;
}

.card-list-enter-from,
.card-list-leave-to {
    opacity: 0;
    scale: 0;
    transform: translateY(30px);
}

.card-list-move {
    transition: transform 0.5s;
}
</style>