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
    <div class="container">
        <div v-if="isModalOpen" class="preview-wrapper">
            <div class="preview-overlay" @click="closeModal"></div>
            <div class="preview-modal content">
                <header>
                    <span @click="closeModal" class="icon-back">
                        <img src="/static/image/icon-back.svg" alt="Back" />
                    </span>
                    <span @click="closeModal" class="icon-close">
                        <img src="/static/image/icon-close.svg" alt="Close" />
                    </span>
                </header>
                <div class="content-area columns is-mobile">
                    <div class="main-content column is-two-thirds-tablet is-full-mobile">
                        <div class="main-content-wrap">
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
                    </div>
                    <div class="metadata-space column is-one-third-tablet is-full-mobile">
                        <div class="metadata-wrap">
                            <div class="meta-info">
                                <div class="metadata">
                                    <div class="name">Url</div>
                                    <div class="value"><a :href="modalData.url">{{ modalData.url }}</a></div>
                                </div>
                                <div class="metadata">
                                    <div class="name">Submitted by</div>
                                    <div class="value"><a :href="'https://github.com/' + modalData.author">@{{
                                        modalData.author
                                    }}</a>
                                        <svg v-if="verified" version="1.1" viewBox="0 0 1200 1200"
                                            xmlns="http://www.w3.org/2000/svg">
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
                            <div class="meta-cta">
                                <a class="is-btn button is-rounded non-primary" target="_blank" :href="modalData.url">
                                    View on Github
                                </a>
                                <a v-if="modalData.artifactSource" class="is-btn button is-rounded is-primary"
                                    target="_blank"
                                    :href="`https://cloud.fermyon.com/deploy?artifact=` + modalData.artifactSource">
                                    Deploy to cloud
                                </a>
                            </div>
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
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 14px 64px 0px rgba(0, 0, 0, 0.33);

    .preview-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        backdrop-filter: blur(6px) brightness(25%);
        background: rgba(darken($docsbg1, 3%), 0.70);
    }

    $modalMax: 1144px;

    .preview-modal.content {
        z-index: 1002;
        height: auto;
        height: 70vh;
        width: 94vw;
        margin-left: auto;
        margin-right: auto;
        max-width: $modalMax;
        background-color: $docsbg1;
        border-radius: 0.67rem;
        display: block;
        border-radius: 0.67rem;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 14px 64px 0px rgba(0, 0, 0, 0.05);

        &.content {
            padding: 0 !important;
        }

        header {
            margin: 0;
            background-color: $docsbg1;
            display: flex;
            height: 3.5rem;
            justify-content: space-between;
            border-radius: 0.67rem 0.67rem 0 0;
            border-bottom: 1px solid $lavendermid;
            position: relative;
            align-items: center;
            padding: 0.5rem;
            z-index: 100;

            span {
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;

                &.icon-back {
                    left: 1.25rem;
                }

                &.icon-close {
                    right: 1.25rem;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            }
        }

        .content-area {
            margin: 0;
            display: flex;
            flex-grow: 1;
            height: 100%;

            .main-content {
                border-right: 1px solid lighten($lavenderfloral, 15%);
                height: 100%;

                .main-content-wrap {
                    padding-top: 3rem;
                    max-height: 100%;
                    overflow-y: scroll;
                    position: absolute;
                    top: 3.5rem;
                    bottom: 0;
                    width: 66.667%;
                }

                .title {
                    font-size: 2.25rem;
                    margin-bottom: 2rem;
                    padding: 0 2rem;
                    font-family: $spaceGro;
                    font-weight: 400;
                }

                .description {
                    flex-grow: 1;
                    padding: 0 2rem 1rem;
                    overflow-y: auto;
                    font-size: 1.25rem;
                    line-height: 2;

                    p {
                        font-size: 1.25rem !important;
                        line-height: 2;
                        letter-spacing: 0.05rem;
                    }
                }

                .tags {
                    padding: 1.75rem 1.5rem;

                    span {
                        display: inline-block;
                        line-height: 1.4;
                        font-size: 1.125rem;
                        border-radius: 1rem !important;
                        padding: 0.15rem 1rem;
                        background-color: darken($docsbg1, 5%);
                        margin: 0 0.5rem 0 0;
                        color: $bluecallout;
                        height: auto;
                        width: auto;
                        cursor: pointer;
                        text-transform: capitalize;
                        transition: backround 0.3s ease-in-out 0;
                    }
                }
            }

            .metadata-space {
                position: relative;
                height: calc(70vh - 3.5rem);
                width: 33.333%;
                display: block;
                padding: 0;

                .metadata-wrap {
                    height: 100%;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    overflow: hidden;
                    overflow-y: scroll;
                    margin-top: 0.75rem;

                    .meta-info {
                        box-sizing: border-box;
                        flex-grow: 1;
                        border-bottom: 1px solid lighten($lavenderfloral, 15%);
                        ;
                        width: 100%;
                        height: 80%;
                    }

                    .meta-cta {
                        flex-grow: 1;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        margin: 1rem 0;

                        a {
                            margin: 0rem 0 1rem 0;
                            display: inline;
                            border-radius: 0.67rem;

                            &.button {
                                width: auto !important;
                                margin: 1rem 2rem 1rem !important;
                                border-radius: 2rem;

                                &.non-primary {
                                    background-color: transparent;
                                    border: 1px solid $seagreen;
                                }
                            }
                        }
                    }
                }



                .metadata {
                    padding: 0.425rem 2rem 0.425rem 2rem;
                    line-height: 1.5;
                    display: block;

                    .name {
                        font-size: 1rem;
                        color: darken($lavendermid, 25%);
                    }

                    .value {
                        font-size: 1rem;
                        word-wrap: break-word;
                        align-items: center;
                        margin-right: 2rem;
                        line-height: 1.3;

                        svg {
                            width: 1rem;
                            height: 1rem;
                            margin-left: 0.5rem;
                            margin-top: 0.5rem;
                        }

                        a {
                            text-decoration: none !important;
                            margin: 0;

                            &::after {
                                display: none;
                            }
                        }

                        &.badge {
                            min-width: 50px;
                            display: inline-flex;
                            align-items: center;
                            justify-content: space-between;
                            border-radius: 2rem;
                            background-color: $lavendermid;
                            padding: 0.2rem 0.75rem;
                            margin-top: 0.5rem;

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

@media screen and (min-width:1024px) and (max-width:1220px) {
    $modalMaxDesktop: 1020px;

    .preview-wrapper {

        .preview-modal.content {
            max-width: $modalMaxDesktop;

            .content-area {
                .main-content {
                    .main-content-wrap {
                        max-width: $modalMaxDesktop;
                    }
                }

                .metadata-space {
                    .metadata-wrap {
                        max-width: calc($modalMaxDesktop / 3) !important;
                    }

                    a.button {
                        width: calc($modalMaxDesktop / 4) !important;
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

    body.hub {
        // modal on mobile
        $modalMaxTablet: 620px;

        .preview-wrapper {

            .preview-modal.content {
                z-index: 1002;
                height: 90vh !important;
                width: 96vw !important;
                max-width: $modalMaxTablet;
                margin-top: 20rem !important;
                margin-bottom: 10rem !important;

                .content-area {
                    flex-direction: column-reverse;

                    .main-content {
                        height: auto;

                        .title,
                        .description {
                            padding-right: 0;
                            padding-left: 0;
                        }

                        .tags {
                            padding: 1rem 0;
                        }

                        .main-content-wrap {
                            width: auto;
                            max-width: $modalMaxTablet;
                            max-height: auto;
                            overflow-y: visible;
                            position: relative;
                            top: auto;
                            bottom: auto;
                        }
                    }

                    a.button {
                        margin: 2rem 0 !important;
                        width: calc($modalMaxTablet - 4rem) !important;
                    }

                    .metadata-space {

                        .metadata-wrap {
                            position: relative;
                            left: auto;
                            margin-left: 0;
                            width: auto;
                            max-width: $modalMaxTablet;

                            .metadata {
                                padding-left: 0;
                                padding-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width:768px) {
    body.hub {
        // modal on mobile
        $modalMaxMobile: 320px;

        .preview-wrapper .preview-modal.content {
            max-width: $modalMaxMobile;
            margin-top: 22rem !important;
            margin-bottom: 12rem !important;

            .content-area {
                .title {
                    font-size: 1.67rem;
                    margin: 0 0 1rem;
                }

                a.button {
                    margin: 2rem 0 !important;
                    width: calc($modalMaxMobile - 4rem) !important;
                }

                .main-content .main-content-wrap {
                    max-width: $modalMaxMobile;
                }

                .metadata-space .metadata-wrap {
                    max-width: $modalMaxMobile;
                }
            }
        }
    }
}

html.dark-theme {
    body.hub {
        .main {

            .preview-wrapper {

                .preview-modal.content {
                    background: #202644 !important;
                    border-color: darken($lavenderdark, 7.5%);

                    header {
                        background: lighten(#202644, 5%) !important;
                        border-color: #202644 !important;
                    }

                    .main-content {
                        border-right: 1px solid $bluecallout;

                        .title {
                            color: white;
                        }

                        .tags {
                            span {
                                background: darken($bluedark, 5%);
                                color: $thistle;
                            }
                        }
                    }

                    .metadata-space {
                        .metadata-wrap {
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

                            .meta-info {
                                border-bottom: 1px solid $bluecallout;
                            }

                            .meta-cta {

                                a.button {

                                    &.non-primary {
                                        color: white !important;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .preview-overlay {
                background: rgba($oxforddark, 0.8);
            }
        }
    }
}
</style>
