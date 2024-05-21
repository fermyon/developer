const { el, mount, text, list, setChildren, setStyle, setAttr } = redom

class codeblockLanguageTab {
    constructor(parentCallback) {
        this.index
        this.parentCallback = parentCallback
        this.lang = el("a")
        this.el = el("li", {
            onclick: function (e) {
                parentCallback(this.index, e.target)
            }.bind(this)
        }, this.lang)
    }
    update(data, index, items, context) {
        this.index = index
        this.lang.textContent = data
        if (context.active == this.index) {
            this.lang.classList.add("is-active")
        } else {
            this.lang.classList.remove("is-active")
        }
    }
}

class multiTabBlockHandler {
    constructor(nodes, tabClass, activeValue, parentCallback) {
        this.tabClass = tabClass
        this.parentCallback = parentCallback
        this.nodes = Array.from(nodes)
        this.langs = this.nodes.map(k => { return k.dataset.title })
        this.active = this.langs.indexOf(activeValue)
        if (tabClass != "spin-version") {
            this.active = this.active > 0 ? this.active : 0
        } else {
            this.active = this.active > 0 ? this.active : this.nodes.length - 1
        }
        this.tabs = list("ul", codeblockLanguageTab, null, this.ChildEventHandler.bind(this))
        this.el = el("div.tabs.is-boxed", this.tabs)

        // If the tabClass is `spin-version` reverse the order of the list
        if (tabClass === "spin-version") {
            setStyle(this.tabs, { display: "flex", "flex-direction": "row-reverse" })
        }

        this.tabs.update(this.langs, { active: this.active })
        this.updateTabContent(this.active)
    }
    ChildEventHandler(data, element) {
        this.tabs.update(this.langs, { active: data })
        this.updateTabContent(data)
        this.parentCallback(this.tabClass, this.langs[data], true, true, element)
    }
    updateTabContent(data) {
        for (let i = 0; i < this.nodes.length; i++) {
            setStyle(this.nodes[i], { display: i == data ? "block" : "none" })
        }
    }
    globalTabUpdate(data) {
        let activeIndex = this.langs.indexOf(data)
        if (activeIndex < 0) return
        this.tabs.update(this.langs, { active: activeIndex })
        this.updateTabContent(activeIndex)
    }
}

class multiTabContentHandler {
    constructor() {
        this.selectedTab = JSON.parse(localStorage.getItem("toggleTabSelections")) || {
            os: null,
        }
        // Set defaults specified in the query parameter
        let queryParamSelectors = filterMultitabQuery()
        Object.keys(queryParamSelectors).map(k => {
            this.selectedTab[k] = queryParamSelectors[k]
        })

        // If no OS preference set, try detect the user OS
        if (this.selectedTab.os == null) {
            this.selectedTab.os = detectOS()
        }
        this.handler = []
        let multiTabBlocks = document.querySelectorAll("div.multitab-content-wrapper")
        multiTabBlocks.forEach((multiTabBlock, index) => {
            let tabs = multiTabBlock.querySelectorAll("div.multitab-content")
            this.handler[index] = {}
            this.handler[index].class = multiTabBlock.dataset.class.toLowerCase()
            this.handler[index].tabBlock = new multiTabBlockHandler(tabs, this.handler[index].class,
                this.selectedTab[this.handler[index].class], this.updateTabs.bind(this))
            multiTabBlock.insertBefore(this.handler[index].tabBlock.el, multiTabBlock.firstChild);
        })
        Object.keys(this.selectedTab).map(k => {
            if (this.selectedTab[k]) {
                this.updateTabs(k, this.selectedTab[k], false)
            }
        })

        window.addEventListener('storage', (e) => {
            if (e.key == "toggleTabSelections") {
                Object.keys(this.selectedTab).map(k => {
                    this.selectedTab = JSON.parse(localStorage.getItem("toggleTabSelections")) || this.selectedTab
                    if (this.selectedTab[k]) {
                        this.updateTabs(k, this.selectedTab[k], false)
                    }
                })
            }
        })
    }
    updateTabs(tabClass, value, updateLocalStorage, isUserEvent, element) {
        if (tabClass == "soloblock") {
            return
        }
        this.selectedTab[tabClass] = value
        let originalOffset, newOffset
        if (isUserEvent) {
            originalOffset = element.getBoundingClientRect().top
        }
        this.handler.map(k => {
            if (k.class == tabClass) {

                k.tabBlock.globalTabUpdate(value)

            }
        })
        if (isUserEvent) {
            newOffset = element.getBoundingClientRect().top + document.documentElement.scrollTop
            window.scroll(0, newOffset - originalOffset)
        }
        if (updateLocalStorage) localStorage.setItem("toggleTabSelections", JSON.stringify(this.selectedTab))
    }
}

function detectOS() {
    let OS = null
    let userAgent = navigator.userAgent.toLowerCase()
    switch (true) {
        case (userAgent.indexOf("win") != -1):
            OS = "Windows";
            break
        case (userAgent.indexOf("mac") != -1):
            OS = "macOS";
            break
        case (userAgent.indexOf("linux") != -1):
            OS = "Linux";
            break
    }
    return OS
}

function filterMultitabQuery() {
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    let query = Object.fromEntries(urlParams.entries())
    let multitabQuery = Object.keys(query).filter(k => {
        return k.indexOf("multitab_") == 0
    }).reduce((obj, key) => {
        obj[key.replace("multitab_", "")] = query[key];
        return obj;
    }, {});
    return multitabQuery
}

export { multiTabContentHandler }