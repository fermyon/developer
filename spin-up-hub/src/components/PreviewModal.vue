<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        closeModal() { this.$store.commit("closePreview") }
    },
    computed: {
        isModalOpen() { return this.$store.state.isModalOpen },
        modalData() {
            return this.$store.state.modalData
        },
        verified() {
            return this.modalData.author == "fermyon"
        }
    },
    updated() {
        document.querySelectorAll("pre > code").forEach((codeblock) => {
            console.log(codeblock)
            codeblock.classList.add("hljs")
        })
    }
}

</script>

<template>
    <div v-if="isModalOpen" class="preview-wrapper">
        <div class="preview-overlay"></div>
        <div class="preview-modal content">
            <div class="topbar">
                <span @click="closeModal"> X </span>
            </div>
            <div class="content-area">
                <div class="main-content">
                    <div class="title">{{ modalData.title }}</div>
                    <div class="description" v="">
                        <div v-if="!modalData.isloaded">loading...</div>
                        <div v-html="modalData.description"></div>
                    </div>
                    <div class="tags">
                        <span v-for="item in modalData.tags">
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="metadata-space">
                    <a class="is-btn button is-primary" target="_blank" :href="modalData.url">
                        View on Github
                    </a>
                    <div class="metadata">
                        <div class="name">Url</div>
                        <div class="value">{{ modalData.url }}</div>
                    </div>
                    <div class="metadata">
                        <div class="name">Submitted by</div>
                        <div class="value">@{{ modalData.author }}
                            <svg v-if="verified" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="m1138 517.5-94-94.5c-3.3438-3.0742-5.1719-7.4609-5-12v-133c0-31.031-12.328-60.789-34.27-82.73-21.941-21.941-51.699-34.27-82.73-34.27h-133c-4.5391 0.17188-8.9258-1.6562-12-5l-94.5-94c-21.922-21.801-51.582-34.039-82.5-34.039s-60.578 12.238-82.5 34.039l-94.5 94c-3.0742 3.3438-7.4609 5.1719-12 5h-133c-31.031 0-60.789 12.328-82.73 34.27-21.941 21.941-34.27 51.699-34.27 82.73v133c0.17188 4.5391-1.6562 8.9258-5 12l-94 94.5c-21.801 21.922-34.039 51.582-34.039 82.5s12.238 60.578 34.039 82.5l94 94.5c3.3438 3.0742 5.1719 7.4609 5 12v133c0 31.031 12.328 60.789 34.27 82.73 21.941 21.941 51.699 34.27 82.73 34.27h133c4.5391-0.17188 8.9258 1.6562 12 5l94.5 94c21.793 22.047 51.5 34.453 82.5 34.453s60.707-12.406 82.5-34.453l94.5-94c3.0742-3.3438 7.4609-5.1719 12-5h133c31.031 0 60.789-12.328 82.73-34.27 21.941-21.941 34.27-51.699 34.27-82.73v-133c-0.17188-4.5391 1.6562-8.9258 5-12l94-94.5c21.801-21.922 34.039-51.582 34.039-82.5s-12.238-60.578-34.039-82.5zm-70.5 94.5-94.5 94c-21.957 22.02-34.199 51.906-34 83v133c0 4.5078-1.793 8.832-4.9805 12.02s-7.5117 4.9805-12.02 4.9805h-133c-31.094-0.19922-60.98 12.043-83 34l-94 94.5c-3.1875 3.1758-7.5 4.957-12 4.957s-8.8125-1.7812-12-4.957l-94-94.5c-22.02-21.957-51.906-34.199-83-34h-133c-4.5078 0-8.832-1.793-12.02-4.9805s-4.9805-7.5117-4.9805-12.02v-133c0.19922-31.094-12.043-60.98-34-83l-94.5-94c-3.1758-3.1875-4.957-7.5-4.957-12s1.7812-8.8125 4.957-12l94.5-94c21.957-22.02 34.199-51.906 34-83v-133c0-4.5078 1.793-8.832 4.9805-12.02s7.5117-4.9805 12.02-4.9805h133c31.094 0.19922 60.98-12.043 83-34l94-94.5c3.1875-3.1758 7.5-4.957 12-4.957s8.8125 1.7812 12 4.957l94 94.5c22.02 21.957 51.906 34.199 83 34h133c4.5078 0 8.832 1.793 12.02 4.9805s4.9805 7.5117 4.9805 12.02v133c-0.19922 31.094 12.043 60.98 34 83l94.5 94c3.1758 3.1875 4.957 7.5 4.957 12s-1.7812 8.8125-4.957 12z" />
                                    <path d="m550 654.5-114.5-115-71 71 185.5 185 285.5-285-71-71z" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="metadata">
                        <div class="name">Language</div>
                        <div class="value">{{ modalData.language }}</div>
                    </div>
                    <div class="metadata">
                        <div class="name">Created at</div>
                        <div class="value">{{ modalData.createdAt }}</div>
                    </div>
                    <div class="metadata">
                        <div class="name">Last updated</div>
                        <div class="value">{{ modalData.lastUpdated }}</div>
                    </div>
                    <div class="metadata">
                        <div class="name">Minimum Spin version</div>
                        <div class="value badge">
                            <img src="/image/spin-vector.png">
                            {{ modalData.spinVersion }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    width: 100%;

    .preview-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        backdrop-filter: blur(6px) brightness(25%);
    }

    .preview-modal {
        z-index: 1002;
        height: 80%;
        width: 80%;
        max-width: 800px;
        background-color: $docsbg1;
        border-radius: 0.67rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.67rem;
        overflow: hidden;

        .topbar {
            padding: 1rem;
            background-color: $docsbg1;
            display: flex;
            justify-content: flex-end;
            border-radius: 0.67rem 0.67rem 0 0;
            border-bottom: 1px solid lighten($lavenderfloral, 15%);
        }

        .content-area {
            display: flex;
            flex-grow: 1;
            min-width: 0;
            min-height: 0;


            .main-content {
                width: 65%;
                border-right: 1px solid lighten($lavenderfloral, 15%);
                padding: 1rem 0rem;
                display: flex;
                flex-direction: column;
                max-height: 100%;
                min-height: 0;

                .title {
                    font-size: 1.75rem;
                    margin-bottom: 2rem;
                    padding: 1rem;
                    font-family: $spaceGro;
                }

                .description {
                    font-size: 1rem;
                    flex-grow: 1;
                    padding: 1rem;
                    overflow-y: auto;
                }

                .tags {
                    padding: 1rem;

                    span {
                        font-size: 0.9rem;
                        border-radius: 0.67rem;
                        background-color: $lavender;
                        padding: 0.2rem 0.4rem;
                        margin-right: 0.5rem;
                    }
                }

            }

            .metadata-space {
                width: 35%;
                padding: 1rem;

                a {
                    margin: 2rem 0 1rem 0;
                    width: 100%;
                    border-radius: 0.67rem;
                }

                .metadata {
                    margin-top: 1rem;

                    .name {
                        font-size: 1rem;
                        color: gray
                    }

                    .value {
                        font-size: 1rem;
                        word-wrap: break-word;
                        display: flex;
                        align-items: center;

                        svg {
                            width: 1rem;
                            height: 1rem;
                            margin-left: 0.5rem;
                        }

                        &.badge {
                            min-width: 50px;
                            display: inline-flex;
                            align-items: center;
                            justify-content: space-between;
                            border-radius: 0.67rem;
                            background-color: $lavendermid;
                            padding: 0.2rem 0.4rem;

                            img {
                                height: 1rem;
                                width: 1rem;
                                margin-right: 0.5rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width:1023px) {
    .content-area {
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        min-height: auto !important;


        .main-content {
            width: 90% !important;
            border-right: none !important;
            order: 2;
            min-height: auto !important;
            max-height: none !important;
            display: block;

            .description {
                height: auto;
                overflow-y: visible;
            }
        }

        .metadata-space {
            width: 90% !important;
            order: 1;
            border-bottom: 1px solid $darkspace;

        }
    }
}

.dark-theme {
    .preview-modal {
        background-color: $oxforddark;
        padding-top: 0;

        .topbar {
            border-bottom: 1px solid lighten($oxforddark, 5%);
            background-color: lighten($oxforddark, 5%);
        }

        .content-area {
            .main-content {
                border-right: 1px solid $bluecallout;

                .title {
                    color: white;
                }

                .tags {
                    span {
                        background: darken($bluedark, 5%);
                    }
                }
            }

        }

        .metadata-space {
            width: 35%;
            padding: 1rem;

            a {
                margin: 2rem 0 1rem 0;
                width: 100%;
                border-radius: 0.67rem;
            }

            .metadata {
                .value {

                    svg {
                        fill: white;
                    }
                    &.badge {
                        color: black;
                    }
                }
            }
        }
    }
}
</style>