import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isModalOpen: false,
      openModalTitle: "",
      contentTypes: ["Plugin", "Template", "Snippet", "Component", "Tutorial", "Learning Resource"],
      languages: ["Rust", "JS/TS", "Go", "Python"],
      contentFilters: [],
      languageFilters: [],
      contentItems: [],
      modalData: {
        title: "Static File Server",
        description: "THis is ssome static stuff that does something which is awesome",
        url: "https://github.com/karthik2804/examples",
        author: "Karthik2804",
        tags: ["web", "crypto"], language: "Typescript", createdAt: "05/19/2023", lastUpdated: "05/19/2023", spinVersion: "1.4"
      }
    }
  },
  mutations: {
    loadModalMeta(state, payload) {
      state.isModalOpen = true
      state.modalData = payload
      state.modalData.description = ""
      state.modalData.isloaded = false
      state.openModalTitle = payload.title
      document.body.classList.add("modal-open")
    },
    closePreview(state) {
      state.isModalOpen = false
      document.body.classList.remove("modal-open")
    },
    updateModalDescription(state, payload) {
      state.modalData.description = payload.description
      state.modalData.isloaded = payload.status ? true : false
    },
    updateContentTypeFilter(state, payload) {
      if (state.contentFilters.includes(payload)) {
        state.contentFilters.splice(state.contentFilters.indexOf(payload))
      } else {
        state.contentFilters.push(payload)
      }
    },
    updateLanguageFilter(state, payload) {
      if (state.languageFilters.includes(payload)) {
        state.languageFilters.splice(state.languageFilters.indexOf(payload))
      } else {
        state.languageFilters.push(payload)
      }
    }
  },
  actions: {
    async openPreview(context, data) {
      context.commit("loadModalMeta", data)
      let title = context.state.openModalTitle
      let res = await fetch("http://localhost:3000" + data.path)
      let text = (await res.text())
      setTimeout(() => {
        if (title === context.state.openModalTitle) {
          context.commit("updateModalDescription", {
            description: unescapeHTML(text),
            status: true
          })
        }
      }, 2000);
    },
    async getContentInfo(context, data) {
      console.log("here")
      let res = await fetch("http://localhost:3000/hub/get_list")
      data = await res.json()
      context.state.contentItems = data
      console.log(data)
    }
  }
})

const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
    ({
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&#39;': "'",
      '&quot;': '"'
    }[tag] || tag)
  );

export { store }