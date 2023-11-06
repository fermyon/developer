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
        tags: [], language: "", createdAt: "", lastUpdated: "", spinVersion: "",
        artifactSource: ""
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
        state.modalData.createdAt = formatTimestamp(data.createdAt)
        state.modalData.lastUpdated = formatTimestamp(data.lastUpdated)
        state.modalData.description = ""
        state.modalData.isloaded = false
        document.body.classList.add("modal-open")
        document.title = `Spin Up Hub | ${state.modalData.title} `
      }
    },
    openPreview(state, payload) {
      state.openPreviewId = payload
      state.isModalOpen = true
      router.push("/hub/preview/" + payload)
    },
    closePreview(state) {
      state.isModalOpen = false
      document.body.classList.remove("modal-open")
      router.push("/hub")
      document.title = "Spin Up Hub"
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
      let res = await fetch(import.meta.env.VITE_API_HOST + (context.state.modalData.path || "/api/hub/404"))
      let text = ""
      if (res.status != 200) {
        text = `<h3>Content not found</h3>
        <p>Unable to load the requested resource. Please try again in case it is a transitent error or open an <a href=\"https://github.com/fermyon/developer/issues\">issue</a></p>
        <p>Browse the available content by closing the modal.</p>`
      } else {
        text = (await res.text())
      }
      if (id === context.state.openPreviewId) {
        context.commit("updateModalDescription", {
          description: unescapeHTML(text),
          status: true
        })
      }
    },
    async getContentInfo(context, data, id) {
      let res = await fetch(import.meta.env.VITE_API_HOST + "/api/hub/get_list")
      if (res.status != 200) {
        console.log("something went wrong")
        return
      }
      data = await res.json()
      context.state.contentItems = data
      context.state.contentItems.map(k => {
        k.title = unescapeHTML(k.title)
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
    /&amp;|&lt;|&gt;|&#39;|&quot;|&#x3D;|&#x27;/g,
    tag =>
    ({
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&#39;': "'",
      '&quot;': '"',
      '&#x3D;': '=',
      '&#x27;': '\''
    }[tag] || tag)
  );

function formatTimestamp(timestamp) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-US', options);
}

export { store, unescapeHTML }