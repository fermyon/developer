<script>
import DeployModal from './DeployPreview.vue';


export default {
    components: {
        DeployModal,
    },
    data() {
        return {
            isDeployModalOpen: false, 
        }
    },
    methods: {
        closeModal() {
            this.$store.commit("closePreview");
        },
        openDeployModal() {
            this.isDeployModalOpen = true;
        },
        closeDeployModal() {
            this.isDeployModalOpen = false;
        },
        showSecondModal() {
            this.isDeployModalOpen = false;
        },

    },
    computed: {
        isModalOpen() {
            return this.$store.state.isModalOpen;
        },
        modalData() {
            return this.$store.state.modalData;
        },
        verified() {
            return this.modalData.author == "fermyon";
        }
    },
    updated() {
        document.querySelectorAll("pre > code").forEach((codeblock) => {
            codeblock.classList.add("hljs");
        });
    }
}
</script>

<template>
    <div class="container">
        <div v-if="isModalOpen" class="preview-wrapper">
            <div class="preview-overlay" @click="closeModal"></div>
            <div class="preview-modal content">
                <header>
                    <span @click="closeModal" class="icon-close">
                        <img src="/static/image/icon-close.svg" alt="Close" />
                    </span>
                </header>
                <div class="content-area columns is-mobile">
                    <div class="main-content column is-two-thirds-tablet is-full-mobile">
                        <div class="main-content-wrap">
                            <div class="header-with-icon">
                                <span @click="closeModal" class="icon-back">
                                    <img src="/static/image/icon-back.svg" alt="Back" />
                                </span>
                                <div class="preview-title">{{ modalData.title }}</div>
                            </div>
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
                            <div class="meta-cta">
                                <a v-if="modalData.artifactSource" class="is-btn button is-rounded is-primary plausible-event-name=hub-btn-deploy"
                                    target="_blank"
                                    href="#"
                                    @click.prevent="openDeployModal">
                                    <span class="button-content">
                                        <img src="/static/image/wasm.png" alt="Logo" class="logo-img" />
                                        <span class="deploy-text">Deploy This →</span>
                                    </span>
                                </a>
                                <a class="is-btn button is-rounded non-primary plausible-event-name=hub-git-btn" target="_blank" :href="modalData.url">
                                    View on Github
                                </a>
                            </div>
                            <div class="meta-info">
                                <div class="metadata">
                                    <div class="name">Url</div>
                                    <div class="value"><a :href="modalData.url" class="plausible-event-name=hub-git-url">{{ modalData.url }}</a></div>
                                </div>
                                <div class="metadata">
                                    <div class="name">Submitted by</div>
                                    <div class="value"><a :href="'https://github.com/' + modalData.author" class="plausible-event-name=hub-git-author">@{{
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- New Modal Component -->
        <DeployModal :isOpen="isDeployModalOpen" @close="closeDeployModal" @show-second-modal="showSecondModal" />
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
    height: 100vh; 
    width: 100vw; 
    z-index: 1001;
    overflow: hidden;
    

    .preview-overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(6px) brightness(25%);
        background: rgba(darken($docsbg1, 3%), 0.70);
    }

    $modalMax: 1144px;

    .preview-modal.content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(6px) brightness(25%);
        background-color: $docsbg1;

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
                flex: 1; 
                display: flex;
                flex-direction: column; 
                overflow-y: hidden; 

                .main-content-wrap {
                    padding-top: 3rem;
                    padding-left: 10rem;
                    flex-grow: 1; 
                    overflow-y: auto; 
                }

                .header-with-icon {
                    display: flex;
                    align-items: center; 
                    margin-bottom: 1rem; 
                }

                .preview-title {
                    font-size: 2.25rem;
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .icon-back {
                    cursor: pointer;
                    margin-right: 10px; 
                    flex-shrink: 0; 
                    margin-right: 2rem;

            img {
                height: 24px; 
                width: auto;
            }
        }

                .description {
                    font-size: 1.25rem; 
                    line-height: 2; 
                    padding: 0 2rem; 
                    padding-left: 3.5rem;
                    overflow-y: auto; 
                    flex-grow: 1;
                    

                    p {
                        font-size: 1.25rem !important;
                        line-height: 2;
                        letter-spacing: 0.05rem;
                    }
                }

                .tags {
                    padding: 1.75rem 1.5rem;
                    padding-left: 3.5rem;
                    padding-bottom: 5rem;

                    span {
                        display: inline-block;
                        line-height: 1.4;
                        font-size: 1.125rem;
                        border-radius: 1rem !important;
                        padding: 0.15rem 1rem;
                        background-color: darken($docsbg1, 5%);
                        margin: 0 0.5rem 0.5rem 0;
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
                display: flex;
                flex-direction: column;
                padding: 0;
                width: 33.333%;
                height: calc(100% - 3.5rem);

                .metadata-wrap {
                    height: 100%;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    overflow: hidden;
                    overflow-y: hidden;
                    margin-top: 0.75rem;

                    .meta-info {
                        box-sizing: border-box;
                        flex-grow: 1;
                        border-bottom: 1px solid lighten($lavenderfloral, 15%);
                        width: 100%;
                        height: 80%;
                        max-height: 80%;
                        overflow-y: auto;
                    }

                    .meta-cta {
                        flex-grow: 1;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        margin: 1rem 0;
                        padding-right: 10rem;

                        a {
                            margin: 0rem 0 1rem 0;
                            display: inline;
                            border-radius: 0.67rem;

                            &.button {
                                width: 250px !important;
                                margin: 1rem 2rem 1rem !important;
                                border-radius: 2rem;
                                height: 3.3rem !important; 
                                text-align: center;
                                justify-content: center;

                                &.non-primary {
                                    background-color: transparent;
                                    border: 1px solid $seagreen;
                                }
                            }
                        }

                    }
                }
                .meta-cta .button.is-primary .button-content {
                    display: flex;
                    align-items: center;
                    transform: translateY(-6px); 
                    justify-content: flex-start;

                    &:hover .deploy-text {
                        color: white;
                    }

                }

                .meta-cta .logo-img {
                    height: 50px; 
                    width: auto;
                    margin-right: 0.5rem; 
                    margin-left: -20px;
                }

                .meta-cta .deploy-text {
                    font-size: 1rem;
                    font-weight: bold;
                    margin-left: 5px;
                }

                .meta-cta .button.non-primary {
                    height: 3rem; 
                    line-height: 3rem; 
                    display: flex;
                    align-items: center;
                    justify-content: center; 
                    text-align: center;
                    width: 100%;
                    padding: 0 1rem; 
                    background-color: transparent;
                    border: 1px solid $seagreen;
                    border-radius: 2rem;
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

@media screen and (max-width: 1023px) {
    .content-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        min-height: 100vh;

        .main-content {
            width: 100%;
            border-right: none;
            order: 1;
            flex-grow: 1;
            display: block;
            overflow-y: visible; 

            .description {
                height: auto;
                overflow-y: visible;
            }

            .main-content-wrap {
                width: 100%;
                height: auto; 
                max-width: none;
                padding: 2rem;
                margin-left: 0;
                margin-top: 3.5rem;
            }
        }

        .metadata-space {
            width: 100%;
            order: 2;
            border-bottom: 1px solid $darkspace;
            height: auto; 
            margin-top: 0; 
            padding-top: 2rem; 

            .metadata-wrap {
                margin-top: 3rem;
                width: 100%;
                height: auto;
                max-width: none;
                overflow: visible;
                padding: 2rem;
            }
        }
    }

    body.hub {
        .preview-wrapper {
            .preview-modal.content {
                z-index: 1002;
                height: 100vh;
                overflow-y: hidden; 
                width: 100%;
                max-width: none;
                margin-top: 0;
                margin-bottom: 0;

                .content-area {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;

                    .main-content {
                        flex-grow: 1;
                        overflow-y: visible; 

                        .preview-title,
                        .description {
                            padding-right: 0;
                            padding-left: 0;
                        }

                        .tags {
                            padding: 1rem 0;
                        }

                        .main-content-wrap {
                            width: 100%;
                            height: auto;
                            max-width: none;
                            overflow-y: hidden; 
                            position: relative;
                            top: auto;
                            bottom: auto;
                            padding: 2rem;
                            margin-left: 0;
                            margin-top: 3.5rem;
                        }
                    }

                    a.button {
                        margin: 2rem 0;
                        width: 90%;
                    }

                    .metadata-space {
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-top: auto; 
                        padding-top: 2rem; 

                        .metadata-wrap {
                            margin-top: 3rem;
                            position: relative;
                            left: auto;
                            margin-left: 0;
                            width: 100%;
                            max-width: none;
                            height: auto;
                            overflow: visible; 
                            padding: 2rem;

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

@media screen and (max-width: 768px) {
    body.hub {
        .preview-wrapper .preview-modal.content {
            max-width: none;
            width: 100%;
            height: 100vh;
            margin-top: 0;
            margin-bottom: 0;
            padding: 0;
            overflow-y: hidden; 

            .content-area {
                display: flex;
                flex-direction: column;
                flex-grow: 1;

                .preview-title {
                    font-size: 1.67rem;
                    margin: 0 0 1rem;
                }

                a.button {
                    margin: 2rem 0;
                    width: 90%;
                }

                .main-content {
                    flex-grow: 1;
                    overflow-y: visible; 

                    .main-content-wrap {
                        width: 100%;
                        max-width: none;
                        height: auto;
                        padding: 2rem;
                        margin-left: 0;
                        margin-top: 3.5rem;
                    }
                }

                .metadata-space {
                    width: 100%;
                    margin-top: auto; 
                    padding-top: 2rem; 

                    .metadata-wrap {
                        margin-top: 3rem;
                        width: 100%;
                        height: auto;
                        max-width: none;
                        overflow: visible; 
                        padding: 2rem;
                    }
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

                        .preview-title {
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
