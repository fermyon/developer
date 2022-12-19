const { el, mount, text, list, setChildren, setStyle, setAttr } = redom

class codeblockLanguageTab {
    constructor(parentCallback) {
        this.index
        this.parentCallback = parentCallback
        this.lang = el("a")
        this.el = el("li", {
            onclick: function (e) {
                parentCallback(this.index)
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
        // this.active = 0
        this.nodes = Array.from(nodes)
        this.langs = this.nodes.map(k => { return k.dataset.title })
        this.active = this.langs.indexOf(activeValue)
        this.active = this.active > 0 ? this.active : 0
        this.tabs = list("ul", codeblockLanguageTab, null, this.ChildEventHandler.bind(this))
        this.el = el("div.tabs.is-boxed", this.tabs)

        this.tabs.update(this.langs, { active: 0 })
        this.updateTabContent(this.active)
    }
    ChildEventHandler(data) {
        this.tabs.update(this.langs, { active: data })
        this.updateTabContent(data)
        this.parentCallback(this.tabClass, this.langs[data], true)
    }
    updateTabContent(data) {
        for (let i = 0; i < this.nodes.length; i++) {
            setStyle(this.nodes[i], { display: i == data ? "block" : "none" })
        }
    }
    globalTabUpdate(data) {
        console.log("global update", data)
        let activeIndex = this.langs.indexOf(data)
        console.log(activeIndex)
        if (activeIndex < 0) return
        this.tabs.update(this.langs, { active: activeIndex })
        this.updateTabContent(activeIndex)
    }
}

class multiTabContentHandler {
    constructor() {
        this.selectedTab = JSON.parse(localStorage.getItem("toggleTabSelections")) || {
            os: null,
            code: null,
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
        Object.keys(this.selectedTab).map(k =>{
            if (this.selectedTab[k] ) {
                this.updateTabs(k, this.selectedTab[k], false)
            }
        })

        window.addEventListener('storage', (e) => {
            if(e.key == "toggleTabSelections") {
                Object.keys(this.selectedTab).map(k =>{
                    this.selectedTab = JSON.parse(localStorage.getItem("toggleTabSelections")) || this.selectedTab
                    if (this.selectedTab[k] ) {
                        this.updateTabs(k, this.selectedTab[k], false)
                    }
                })
            }
         })
    }
    updateTabs(tabClass, value, updateLocalStorage) {
        if (tabClass == "soloblock") {
            return
        }
        this.selectedTab[tabClass] = value
        console.log("setting value", value)
        this.handler.map(k => {
            if (k.class == tabClass) {
                k.tabBlock.globalTabUpdate(value)
            }
        })
        if(updateLocalStorage) localStorage.setItem("toggleTabSelections", JSON.stringify(this.selectedTab))
    }
}

export { multiTabContentHandler }