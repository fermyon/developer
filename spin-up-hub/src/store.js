import { createStore } from 'vuex'
import { router } from "./router"
import lunr from 'lunr'

const store = createStore({
  state() {
    return {
      isModalOpen: false,
      openPreviewId: "",
      modalData: {
        title: "",
        description: '',
        url: "",
        author: "",
        tags: [], language: "", createdAt: "", lastUpdated: "", spinVersion: ""
      },
      contentTypes: ["Plugin", "Template", "Library", "Sample"],
      languages: ["Rust", "JS/TS", "Go", "Python"],
      contentFilters: [],
      languageFilters: [],
      contentItems: [],
      loadedSearchData: false,
      searchIndex: [],
      searchTerm: ""
    }
  },
  mutations: {
    loadModalMeta(state, payload) {
      let data = state.contentItems.find(k => k.id == payload)
      if (data) {
        state.modalData = data
        console.log(state.testData)
        state.modalData.description = ""
        state.modalData.isloaded = false
        document.body.classList.add("modal-open")

      }
    },
    openPreview(state, payload) {
      console.log(payload)
      state.openPreviewId = payload
      state.isModalOpen = true
      router.push("/hub/preview/" + payload)
    },
    closePreview(state) {
      state.isModalOpen = false
      document.body.classList.remove("modal-open")
      router.push("/hub")
    },
    updateModalDescription(state, payload) {
      state.modalData.description = payload.description
      state.modalData.isloaded = payload.status ? true : false
    },
    updateContentTypeFilter(state, payload) {
      if (state.contentFilters.includes(payload)) {
        state.contentFilters.splice(state.contentFilters.indexOf(payload), 1)
      } else {
        state.contentFilters.push(payload)
      }
    },
    updateLanguageFilter(state, payload) {
      if (state.languageFilters.includes(payload)) {
        state.languageFilters.splice(state.languageFilters.indexOf(payload), 1)
      } else {
        state.languageFilters.push(payload)
      }
    },
    updateSearchTerm(state, payload) {
      state.searchTerm = payload
    }
  },
  actions: {
    async getPreviewData(context) {
      let id = context.state.openPreviewId
      let res = await fetch(import.meta.env.VITE_API_HOST + context.state.modalData.path)
      let text = (await res.text())
      if (id === context.state.openPreviewId) {
        context.commit("updateModalDescription", {
          description: unescapeHTML(text),
          status: true
        })
      }
    },
    async getContentInfo(context, data, id) {
      let res = await fetch(import.meta.env.VITE_API_HOST + "/api/hub/get_list")
      data = await res.json()
      context.state.contentItems = data
      context.state.contentItems.map(k => {
        k.id = k.path.substring(k.path.lastIndexOf('/') + 1)
      })
    },
    async loadSearchData(context) {
      let data = await fetch(import.meta.env.VITE_API_HOST + "/static/hub-index-data.json")
      let documents = await data.json()
      context.state.searchIndex = lunr(function () {
        this.field('title')
        this.field('content')
        this.field('language', { boost: 10 })
        this.field('author'),
          this.field('tags', { boost: 100 })
        this.field('keywords', { boost: 100 })
        this.field('url')
        this.ref('id')

        documents.forEach(function (doc) {
          this.add(doc)
        }, this)
      })
    }
  }
})

const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;|&#x3D;/g,
    tag =>
    ({
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&#39;': "'",
      '&quot;': '"',
      '&#x3D;': '='
    }[tag] || tag)
  );

export { store, unescapeHTML }