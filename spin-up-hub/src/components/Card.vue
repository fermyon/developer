<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        OpenItem() {
            this.$store.commit("openPreview", this.$props.item.id)
            this.$store.commit("loadModalMeta", this.$props.item.id)
            this.$store.dispatch("getPreviewData")
        }
    },
    props: ["item"]
}
</script>

<template>
    <div class="content-card" @click="OpenItem">
        <div class="topbar">
            <span class="category">{{ item.category }}</span>
            <span class="icon"></span>
        </div>
        <div class="content-title">
            {{ item.title }}
        </div>
        <div class="tags">
            <span v-for="tag in item.tags">
                {{ tag }}
            </span>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.content-card {
    margin-bottom: 1rem;
    height: 200px;
    min-width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    background-color: $thistle;
    padding: 1rem;
    border-radius: 0.67rem;
    transition: all 1s ease-in-out;
    overflow: hidden;
    margin-right: 0.5rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid darken($lavenderdark, 5%);

    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .category {
            background-color: white;
            display: inline-block;
            border-radius: 0.67rem;
            padding: 0.2rem 0.4rem;
            color: $darkspace;
            font-size: 0.75rem;
            text-transform: uppercase;
        }

        .icon {
            width: 20px;
            height: 20px;

            path {
                stroke: black;
            }
        }
    }

    .content-title {
        margin-top: 1rem;
        flex-grow: 1;
        font-size: 1.125rem;
        font-weight: 600;
    }

    .tags {
        font-size: 0.8rem;

        span {
            padding: 0.2rem;
            margin-right: 0.5rem;
            color: $bluedark;
        }
    }
}

.dark-theme {
    .content-card {
        background-color: darken($bluecallout, 2.5%);

        .category {
            color: $lavenderlight;
            background-color: darken($lavenderdark, 25%);
        }

        .tags {
            span {
                color: $lavendermid;
            }
        }
    }
}
</style>