<script>
import { unescapeHTML } from "../store"
export default {
    data() {
        return {
            contributionGuide: ""
        }
    },
    async mounted() {
        let res = await fetch(import.meta.env.VITE_API_HOST + "/api/hub/contributing")
        this.contributionGuide = "<h1>Spin Up Hub Contribution Guide</h1>" + unescapeHTML(await res.text()).replaceAll('class="language', 'class="hljs langugae"')
    }
}
</script>

<template>
    <div class="columns">
        <article class="column content content-docs content-docs-wide">
            <section class="type" v-html='this.contributionGuide'>
            </section>
        </article>
    </div>
</template>

<style scoped>
.documentation {
    display: flex;
    justify-content: center;
    margin-top: 8rem;

    .content-docs {
        max-width: 800px;
    }
}
</style>