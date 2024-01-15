const { el, mount, text, list, setChildren, setStyle, setAttr } = redom

const projectList = ["Spin", "Cloud", "Bartholomew"]
const versionPattern = /^v\d+$/;
let idx
let documents

async function getSearchIndex() {
    try {
        let res = await fetch('/static/data.json')
        return await res.json()
    }
    catch (err) {
        console.log("cannot load search module")
    }
}

async function setupSearch() {
    documents = await getSearchIndex()
    let currentPath = window.location.pathname
    let splitPath = currentPath.split("/")
    let version = splitPath[2]
    if (version == "v1") {
        documents = documents.filter(k => {
            if (k.project != "spin") {
                return true
            }
            return k.url.includes("spin/v1/")
        })
    } else {
        documents = documents.filter(k => {
            return k.project != "spin" || !k.url.includes("spin/v1/")
        })
    }

    idx = lunr(function () {
        this.field('title')
        this.field('subheading')
        this.field('content')
        this.field('keywords', { boost: 100 })
        this.field('subsectionKeywords', { boost: 100 })
        this.ref('url')

        documents.forEach(function (doc) {
            this.add(doc)
        }, this)
    })
}

class SearchButton {
    constructor(modal) {
        this.modal = modal
        this.searchPlaceholder = el("span.search-placeholder", "Search")
        this.searchCommand = el("span.search-command", "⌘/ctrl + K")
        this.el = el("button.search-button", {
            onclick: function (e) {
                this.modal.open()
            }.bind(this)
        }, [this.searchPlaceholder, this.searchCommand])

        let mobileSearch = document.getElementById("mobile-search")
        if (mobileSearch) {
            mobileSearch.classList.add("enable")
            mobileSearch.addEventListener("click", () => { this.modal.open() })
        }
    }
}

class SearchResultSubHeading {
    constructor() {
        this.itemIcon = el("span.result-item-icon", "#")
        this.link = el("span")
        this.el = el("a.result-subitem", { onclick: function (e) { searchModal.close() } }, [this.itemIcon, this.link])
    }
    update(data) {
        this.link.textContent = data.subheading
        this.el.href = data.url
        // Hide listing where the subheading is empty
        if (data.subheading == "") {
            setStyle(this.el, { display: "none" })
        } else {
            setStyle(this.el, { display: "flex" })
        }
    }
}

class SearchResultItem {
    constructor() {
        this.subheading = list("div.result-subheading-container", SearchResultSubHeading)
        this.projectName = el("code.project-name")
        this.pageTitle = el("span")
        this.title = el("a", this.pageTitle, this.projectName)
        this.el = el("div.result-block", [this.title, this.subheading])
    }
    update(data) {
        this.pageTitle.textContent = data.title
        this.projectName.textContent = data.project
        this.title.href = data.url
        this.subheading.update(data.data)
    }
}

class ResultFilterItem {
    constructor() {
        this.index
        this.active = true
        this.parentCallback
        this.el = el("code.active", {
            onclick: function (e) {
                this.toggle()
            }.bind(this)
        })
    }
    update(data, index, item, context) {
        this.parentCallback = context.callback
        this.index = index
        context.reset ? this.active = true : ""
        if (this.active) {
            this.el.classList.add("active")
        }
        this.el.textContent = data
    }
    toggle() {
        this.active = !this.active
        if (this.active) {
            this.el.classList.add("active")
        } else {
            this.el.classList.remove("active")
        }
        this.parentCallback(this.index, this.active)
    }
}

class SearchResultFilter {
    constructor(categories, callback) {
        this.categories = categories
        this.parentCallback = callback
        this.active = [true, true, true]
        this.activefilter = categories.map(k => k.toLowerCase())
        this.filters = list("div.filter-categories", ResultFilterItem)
        this.filters.update(this.categories, { callback: this.updateFilterSearch.bind(this) })
        this.resetFilter = el("span.reset-filter", { onclick: function (e) { this.resetFilters() }.bind(this) }, 'Clear filters')
        this.el = el("div.result-filters", this.filters, this.resetFilter)
    }
    updateFilterSearch(index, status) {
        console.log(this.active, this.active[index])
        this.active[index] = status
        this.activefilter = this.categories.filter((k, i) => { return this.active[i] }).map(k => { return k.toLowerCase() })
        this.parentCallback(this.activefilter)
    }
    resetFilters() {
        this.activefilter = this.categories.map(k => k.toLowerCase())
        this.parentCallback(this.activefilter)
        this.filters.update(this.categories, { callback: this.updateFilterSearch.bind(this), reset: true })
    }
}

class SearchResult {
    constructor() {
        this.data
        this.projects = projectList
        this.resultItems = list("div.result-section", SearchResultItem)
        this.resultFilters = new SearchResultFilter(this.projects, this.filter.bind(this))
        this.el = el("div.result-section-container", this.resultFilters, this.resultItems)
    }
    update(data) {
        this.data = data
        this.resultItems.update(this.data)
    }
    filter(filters) {
        this.resultItems.update(this.data.filter(k => {
            return filters.includes(k.project)
        }))
    }
}

class ProjectRecommendations {
    constructor() {
        this.link1 = el("a.suggested-project-link")
        this.link2 = el("a.suggested-project-link")
        this.link3 = el("a.suggested-project-link")
        this.link4 = el("a.suggested-project-link")
        this.projectLinks = el("div.recommended-navs", this.link1, this.link2, this.link3, this.link4)
        this.projectTitle = el("div.project-title")
        this.el = el("div.suggested-project", this.projectTitle, this.projectLinks)
    }
    update(data) {
        this.projectTitle.textContent = data.project
        this.link1.textContent = data.link1[0]
        this.link1.href = data.link1[1]
        this.link2.textContent = data.link2[0]
        this.link2.href = data.link2[1]
        this.link3.textContent = data.link3[0]
        this.link3.href = data.link3[1]
        this.link4.textContent = data.link4[0]
        this.link4.href = data.link4[1]
    }
}

// this content shouldn't live in the theme javascript, ideally be managed via the config/site.toml and shortcodes in the template html
class ModalSuggest {
    constructor() {
        this.projectData = [
            {
                project: "Spin",
                link1: ["Install", "/spin/install"],
                link2: ["Quickstart", "/spin/quickstart/"],
                link3: ["Develop", "/spin/developing"],
                link4: ["Deploy", "/spin/deploying-to-fermyon/"]
            },
            {
                project: "Cloud",
                link1: ["Quickstart", "/cloud/quickstart"],
                link2: ["VS Code", "/cloud/spin-vs-code-extension"],
                link3: ["Support", "/cloud/support"],
                link4: ["FAQ", "/cloud/faq"]
            }
        ]
        this.projectRecommendations = list("div.result-section", ProjectRecommendations)
        this.projectRecommendations.update(this.projectData)
        this.el = el("div.result-section-container", "Suggested Projects", this.projectRecommendations)
    }
}

class SearchModal {
    constructor() {
        this.container = document.getElementById("search-modal-container")
        this.modalSearchBar = el("input.modal-search-bar", {
            type: "text", spellcheck: false,
            placeholder: "Search Fermyon Developer Home", oninput: function (e) {
                this.updateSearch()
            }.bind(this)
        })
        this.searchResults = new SearchResult()
        this.modalSuggest = new ModalSuggest()
        this.modal = el("div.modal-box", { onclick: function (e) { e.stopPropagation() } })
        this.el = el("div.modal-wrapper", {
            onclick: function (e) { this.close() }.bind(this), onkeydown: function (e) {
                if (e.key != "Escape") {
                    e.stopPropagation()
                }
            }
        }, this.modal)
    }
    open() {
        setStyle(this.container, { display: "block" })
        setStyle(document.body, { "overflow": "hidden", height: "100%" })
        this.modalSearchBar.value = ""
        setChildren(this.modal, [this.modalSearchBar, this.modalSuggest])
        this.modalSearchBar.focus()
    }
    close() {
        setStyle(this.container, { display: "none" })
        setStyle(document.body, { "overflow-y": "auto", height: "auto" })
        setChildren(this.modal, [])
    }
    updateSearch() {
        let query = this.modalSearchBar.value
        if (query == "") {
            setChildren(this.modal, [this.modalSearchBar, this.modalSuggest])
            return
        }
        let updatedQuery = query
            .split(" ")
            .map(word => word + '^2 ' + word + '* ' + word + '~2')
            .join(' ');
        let result = idx.search(updatedQuery)
        let matches = {}
        let data
        result.map(k => {
            if (k.score < 0.5) {
                return
            }
            data = documents.find((post) => k.ref === post.url)
            let key = data.title.replaceAll(" ", "")
            if (!matches[key]) {
                matches[key] = {}
                matches[key].data = []
            }
            if (data.subheading == "") {
                matches[key].url = data.url
            } else {
                matches[key].url = data.url.slice(0, data.url.indexOf("#"))
            }
            matches[key].data.push({ subheading: data.subheading, url: data.url })
            matches[key].title = data.title
            matches[key].project = data.project
            matches[key].score = matches[key].score ? (matches[key].score > k.score ? matches[key].score : k.score) : k.score
        })
        matches = Object.keys(matches).map(k => {
            return matches[k]
        }).sort(function (a, b) { return b.score - a.score }).filter(k => { return k.title != undefined })
        this.searchResults.update(matches)
        setChildren(this.modal, [this.modalSearchBar, this.searchResults])
    }
}

let searchModal = new SearchModal()
let searchButton = new SearchButton(searchModal)

export { setupSearch, searchButton, searchModal }