<script>
import {unescapeHTML} from "../store"
export default {
    data() {
        return {
            contributionGuide: ""
        }
    },
    async mounted() {
        let res = await fetch("http://localhost:3000/api/hub/contributing")
        this.contributionGuide = unescapeHTML(await res.text())
        console.log(this.contributionGuide)
    }
}
</script>

<template>
    <div class="documentation">
        <article class="content-docs">
            <div class="content" v-html='this.contributionGuide'></div>
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