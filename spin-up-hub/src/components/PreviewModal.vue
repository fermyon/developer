<script>
import { computed } from 'vue';


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
        }
    }
}

</script>

<template>
    <div v-if="isModalOpen" class="preview-wrapper">
        <div class="preview-overlay"></div>
        <div class="preview-modal">
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
                        <div class="value">@{{ modalData.author }}</div>
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
        background-color: $oxfordblue;
        border-radius: 0.67rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.67rem;
        overflow: hidden;

        .topbar {
            padding: 1rem;
            background-color: $darkspace;
            display: flex;
            justify-content: flex-end;
            border-radius: 0.67rem 0.67rem 0 0;

        }

        .content-area {
            display: flex;
            flex-grow: 1;
            min-width: 0;
            min-height: 0;


            .main-content {
                width: 65%;
                border-right: 1px solid $darkspace;
                padding: 1rem 0rem;
                display: flex;
                flex-direction: column;
                max-height: 100%;
                min-height: 0;

                .title {
                    font-size: 1.75rem;
                    margin-bottom: 2rem;
                    color: $lavender;
                    padding: 1rem;
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
                        background-color: $darkspace;
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

                        &.badge {
                            min-width: 50px;
                            display: inline-flex;
                            align-items: center;
                            justify-content: space-between;
                            border-radius: 0.67rem;
                            background-color: $lavender;
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
</style>