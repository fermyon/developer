<script>
import Card from "./Card.vue"
export default {
    data() {
        return {
            noResultsMessage: '',
            isSearching: false,
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
            let data = this.$store.state.contentItems || []
            this.noResultsMessage = ''

            if (this.searchTerm) {
                this.isSearching = true;
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
            } else {
                this.isSearching = false;
                if (data.length === 0) {
                    this.noResultsMessage = "No items available."
                }
            }

            let contentFilterLength = this.filteredContentTypes.length
            let languageFilterLength = this.filteredLanguages.length

            if (contentFilterLength + languageFilterLength === 0) {
                if (data.length === 0 && this.isSearching) {
                    this.noResultsMessage = "No items matched your search."
                }
                return data;
            }

            if (contentFilterLength === 0) {
                return data.filter(k => { return this.filteredLanguages.includes(k.language) })
            }
            if (languageFilterLength === 0) {
                return data.filter(k => { return this.filteredContentTypes.includes(k.category) })
            } else {
                data = data.filter(k =>
                    this.filteredContentTypes.includes(k.category) &&
                    this.filteredLanguages.includes(k.language)
                )
            }

            if (data.length === 0 && this.isSearching) {
                this.noResultsMessage = "No items matched your search 👀"
            }

            return data
        }
    }
}
</script>


<template>
    <div class="content-listing column is-four-fifths-desktop is-full-touch">
        <transition-group class="card-groups columns is-0 is-mobile is-multiline" tag="div"  name="card-list" appear>
            <Card v-for="item in contentItems" :item="item" :key="item.title"></Card>
        </transition-group>
        <div v-if="isSearching && noResultsMessage" class="no-results-message">{{ noResultsMessage }}</div>
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

.no-results-message {
    color: #3f4f99;
    font-size: 1.5em; 
    text-align: center;
    width: 100%;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
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

.dark-theme {
    .no-results-message {
        color: #e7d3f2;
    }
}
</style>
