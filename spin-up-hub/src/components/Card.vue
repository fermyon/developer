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
    computed: {
        verified() {
            return this.$props.item.author == "fermyon"
        }
    },
    props: ["item"]
}
</script>

<template>
    <div class="column is-one-third-desktop is-full-mobile is-half-tablet" @click="OpenItem">
        <a class="card">
            <header>
                <span class="category">
                    {{ item.category }}
                    <svg v-if="verified" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="m1138 517.5-94-94.5c-3.3438-3.0742-5.1719-7.4609-5-12v-133c0-31.031-12.328-60.789-34.27-82.73-21.941-21.941-51.699-34.27-82.73-34.27h-133c-4.5391 0.17188-8.9258-1.6562-12-5l-94.5-94c-21.922-21.801-51.582-34.039-82.5-34.039s-60.578 12.238-82.5 34.039l-94.5 94c-3.0742 3.3438-7.4609 5.1719-12 5h-133c-31.031 0-60.789 12.328-82.73 34.27-21.941 21.941-34.27 51.699-34.27 82.73v133c0.17188 4.5391-1.6562 8.9258-5 12l-94 94.5c-21.801 21.922-34.039 51.582-34.039 82.5s12.238 60.578 34.039 82.5l94 94.5c3.3438 3.0742 5.1719 7.4609 5 12v133c0 31.031 12.328 60.789 34.27 82.73 21.941 21.941 51.699 34.27 82.73 34.27h133c4.5391-0.17188 8.9258 1.6562 12 5l94.5 94c21.793 22.047 51.5 34.453 82.5 34.453s60.707-12.406 82.5-34.453l94.5-94c3.0742-3.3438 7.4609-5.1719 12-5h133c31.031 0 60.789-12.328 82.73-34.27 21.941-21.941 34.27-51.699 34.27-82.73v-133c-0.17188-4.5391 1.6562-8.9258 5-12l94-94.5c21.801-21.922 34.039-51.582 34.039-82.5s-12.238-60.578-34.039-82.5zm-70.5 94.5-94.5 94c-21.957 22.02-34.199 51.906-34 83v133c0 4.5078-1.793 8.832-4.9805 12.02s-7.5117 4.9805-12.02 4.9805h-133c-31.094-0.19922-60.98 12.043-83 34l-94 94.5c-3.1875 3.1758-7.5 4.957-12 4.957s-8.8125-1.7812-12-4.957l-94-94.5c-22.02-21.957-51.906-34.199-83-34h-133c-4.5078 0-8.832-1.793-12.02-4.9805s-4.9805-7.5117-4.9805-12.02v-133c0.19922-31.094-12.043-60.98-34-83l-94.5-94c-3.1758-3.1875-4.957-7.5-4.957-12s1.7812-8.8125 4.957-12l94.5-94c21.957-22.02 34.199-51.906 34-83v-133c0-4.5078 1.793-8.832 4.9805-12.02s7.5117-4.9805 12.02-4.9805h133c31.094 0.19922 60.98-12.043 83-34l94-94.5c3.1875-3.1758 7.5-4.957 12-4.957s8.8125 1.7812 12 4.957l94 94.5c22.02 21.957 51.906 34.199 83 34h133c4.5078 0 8.832 1.793 12.02 4.9805s4.9805 7.5117 4.9805 12.02v133c-0.19922 31.094 12.043 60.98 34 83l94.5 94c3.1758 3.1875 4.957 7.5 4.957 12s-1.7812 8.8125-4.957 12z" />
                            <path d="m550 654.5-114.5-115-71 71 185.5 185 285.5-285-71-71z" />
                        </g>
                    </svg>
                </span>
                <div>
                    <span v-if="item.artifactSource" style="margin-right: 0.5rem;" class="icon"><img
                            src="/static/image/deploy-to-cloud.svg" alt="GitHub" /></span>
                    <span class="icon"><img src="/static/image/icon-github.svg" alt="GitHub" /></span>
                </div>
            </header>

            <article>
                <h3>{{ item.title }}</h3>

                <p class="summary">
                    {{ item.summary }}
                </p>

                <div class="tags">
                    <span v-for="tag in item.tags">
                        {{ tag }}
                    </span>
                </div>
            </article>
        </a>
    </div>
</template>

<style lang="scss" scoped>
a.card {
    display: flex;
    height: 12rem;
    overflow-y: hidden;
    flex-direction: column;
    background: darken($docsbg1, 2.5%);
    padding: 1.333rem;
    border-radius: 1.333rem;
    overflow: hidden;
    border: 1px solid darken($lavendermid, 5%);
    transition: background 0.5s ease-in-out 0;
    transition: border-color 0.3s ease-in-out 0;
    z-index: 800;
    box-shadow: 0 0.25rem 0.333rem rgba(0, 0, 0, 0.05);

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 2rem;
        transition: all 0.5s ease-in-out 0.15s;

        .category {
            background-color: white;
            display: inline-block;
            border-radius: 0.67rem;
            padding: 0.15rem 0.67rem;
            margin: 0 0 0 -0.25rem;
            color: $darkspace;
            font-size: 0.75rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            color: $bluedark;
            @include upperCase;
            letter-spacing: 0.05rem;
            opacity: 1;
            transition: all 0.5s ease-in-out 0.15s;

            svg {
                width: 1rem;
                height: 1rem;
                margin-left: 0.5rem;
                fill: $bluedark;
                stroke: $bluedark;
                opacity: 0.8;
            }
        }

        .icon {
            width: 20px;
            height: 20px;

            path {
                stroke: black;
                fill: black;
            }
        }
    }

    article {
        margin-top: 1rem;
        flex-grow: 1;
        font-size: 1.125rem;
        font-weight: 600;
        transition: margin-top 0.5s ease-in-out 0.25s;
        overflow-y: hidden;

        h3 {
            font-weight: 500;
            font-size: 1.2rem;
            color: $oxforddark;
            font-family: $spaceGro;
            line-height: 1.35;
            margin: 0.25rem 0 1rem;
            letter-spacing: 0.0825rem;
            display: -webkit-box;
            overflow-y: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            max-height: 4.5em;
        }
    }

    .summary {
        font-size: 0.9rem;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        font-weight: 400;
        color: $bluecallout;
        transition: opacity 0.5s ease-in-out 0.25s;
        letter-spacing: 0.05rem;
    }

    .tags {
        font-size: 0.75rem;
        position: absolute;
        bottom: 1.33rem;
        left: 1.25rem;
        right: 1.25rem;
        overflow: hidden;

        span {
            padding: 0.2rem;
            margin-right: 0.5rem;
            color: $lavenderdark;
            font-size: 0.7rem;
            font-style: normal;
            font-weight: 400;
            @include upperCase;
            letter-spacing: 0.0825rem;
            line-height: 1.21538rem;
        }
    }

    &:hover {
        border-color: $lavenderfloral;
        background: darken($docsbg1, 1%);

        header {
            opacity: 0;
            transform: translateY(-2rem);
            max-height: 0;
            margin: 0;

            .category {
                opacity: 0.2;
            }
        }

        article {
            flex-grow: 0;
            margin-top: -0.5rem;
            max-height: 8.2rem;
        }

        .summary {
            max-height: 200px;
            flex-grow: 1;
            opacity: 1;
        }
    }
}

.dark-theme {
    .card {
        background: #202644 !important;
        border-color: darken($lavenderdark, 7.5%);
        color: white;

        &:hover {
            border-color: $lavenderfloral;
            background: linear-gradient(105deg, rgba(154, 103, 194, 0.21) 0%, rgba(124, 109, 185, 0.1) 100%) !important;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) !important;
        }

        .category {
            color: $thistle;
            background-color: darken($lavenderdark, 33.33%);

            svg {
                fill: $lavenderlight;
                stroke: $lavenderlight;
            }
        }

        .tags {
            span {
                color: lighten($lavenderfloral, 7.5%);
            }
        }

        article {
            color: white;

            h3 {
                color: white;
            }
        }
    }
}
</style>