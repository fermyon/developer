import { createStore } from 'vuex'

const store = createStore({
  state() {
      return {
          isModalOpen: false,
          contentTypes: ["Plugin",  "Templates", "Snippets", "Components", "Tutorials", "Learning Resources"],
          languages: ["Rust", "JS/TS", "Go", "Python"],
          contentFilters: [],
          languageFilters: [],
          contentItems: [
            { author: "Karthik2804", github: "https://github.com/karthik2804", title: "Static File Server", category: "Templates", tags: ["web", "crypto"],language: "Rust",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4", url: "https://github.com/fermyon/examples"},
            { author: "Karthik2804", github: "https://github.com/karthik2804", title: "URL Shortener", category: "Blog", tags: ["web", "crypto"],language: "JS/TS",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4", url: "https://github.com/fermyon/examples"},
            { author: "Karthik2804", github: "https://github.com/karthik2804", title: "Vue.js Application with Key Value Storage", category: "Blog", tags: ["web", "crypto"],language: "Go",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4", url: "https://github.com/fermyon/examples"},
            { author: "Karthik2804", github: "https://github.com/karthik2804", title: "JS2Wasm", category: "Plugin", tags: ["web", "crypto"],language: "JS/TS",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4", url: "https://github.com/fermyon/examples"},
            { author: "Karthik2804", github: "https://github.com/karthik2804", title: "Set Cookie", category: "Example", tags: ["web", "crypto"],language: "Python",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4", url: "https://github.com/fermyon/examples"},
          ],
          modalData: {
            title: "Static File Server",
            description: "THis is ssome static stuff that does something which is awesome",
            url: "https://github.com/karthik2804/examples",
            author: "Karthik2804",
            tags: ["web", "crypto"],language: "Typescript",createdAt: "05/19/2023", lastUpdated: "05/19/2023",spinVersion: "1.4"
          }
      }
  },
  mutations: {
      loadModalMeta(state, payload) {
          state.isModalOpen = true
          state.modalData = payload
          state.modalData.description = ""
          state.modalData.isloaded = false
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
        if(state.contentFilters.includes(payload)) {
            state.contentFilters.splice(state.contentFilters.indexOf(payload))
        } else {
            state.contentFilters.push(payload)
        }
      },
      updateLanguageFilter(state, payload) {
        if(state.languageFilters.includes(payload)) {
            state.languageFilters.splice(state.languageFilters.indexOf(payload))
        } else {
            state.languageFilters.push(payload)
        }
      }
  },
  actions: {
    openPreview(context, data) {
        context.commit("loadModalMeta", data)
        setInterval(() => {
            context.commit("updateModalDescription", {
                description: "This is some random description that may help or it may not who knows",
                status: true
            })
        }, 2000);
    }
  }
})

export {store}