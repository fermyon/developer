const { el, mount, text, list, setChildren, setStyle, setAttr } = redom

let documents

var header = new Headroom(document.querySelector("#topbar"), {
  tolerance: 5,
  offset: 80
});

var blogAd = new Headroom(document.querySelector("#blogSlogan"), {
  tolerance: 5,
  offset: 300
});

document.querySelectorAll('.modal-button').forEach(function(el) {
  el.addEventListener('click', function() {
    var target = document.querySelector(el.getAttribute('data-target'));

    target.classList.add('is-active');
    target.querySelector('.modal-close').addEventListener('click', function() {
      target.classList.remove('is-active');
    });
    target.querySelector('.modal-background').addEventListener('click', function() {
      target.classList.remove('is-active');
    });
  });
});



if (document.body.contains(document.getElementById('blogSlogan'))) {
  blogAd.init();
};

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>';
const svgCheck =
  '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="#18d1a5" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';


const addCopyButtons = (clipboard) => {
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    let content = codeBlock.innerText.trim()
    let isComment = codeBlock.parentNode.previousSibling.previousSibling
    if (isComment.nodeName == "#comment") {
      switch (isComment.textContent.trim()) {
        case "@nocpy": return
        case "@selectiveCpy": {
          let previousSlashEnding = false
          content = content.split("\n").map(k => {
            k = k.trim()
            let isCommand = k.startsWith("$")
            if (isCommand || previousSlashEnding == true) {
              if (!k.endsWith("\\")) {
                previousSlashEnding = false
              } else {
                previousSlashEnding = true
              }
              return isCommand ? k.substring(1).trim() : k
            } else {
              return undefined
            }
          }).filter(k => k != undefined).join("\n")
        }
      }
    }
    let button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.ariaLabel = "Copy code"
    button.innerHTML = svgCopy;
    button.addEventListener("click", () => {
      clipboard.writeText(content).then(
        () => {
          button.classList.add("is-success")
          button.innerHTML = svgCheck;
          setTimeout(() => {
            button.innerHTML = svgCopy
            button.classList.remove("is-success")
          }, 2000);
        },
        (error) => (button.innerHTML = "Error")
      );
    });
    let pre = codeBlock.parentNode;
    pre.appendChild(button);
  });
};


const addAnchorLinks = () => {
  document.querySelectorAll(".content h1, .content h2, .content h3, .content h4").forEach(heading => {
    let id = heading.innerText.toLowerCase()
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
      .replace(/ +/g, '-');
    heading.setAttribute("id", id);
    heading.classList.add("heading-anchor");
    let anchor = document.createElement('a');
    anchor.className = 'anchor-link';
    anchor.href = '#' + id;
    anchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>';
    heading.append(anchor);
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      window.location = anchor.href
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start' //scroll to top of the target element
      })
    })
  })
}

let idx

async function getSearchIndex() {
  try {
    let res = await fetch('/static/data.json')
    return await res.json()
  }
  catch (err) {
    console.Err("cannot load search module")
  }
}

async function setupSearch() {
  documents = await getSearchIndex()
  idx = lunr(function() {
    this.field('title')
    this.field('subheading')
    this.field('content')
    this.field('keywords', { boost: 10 })
    this.ref('url')

    documents.forEach(function(doc) {
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
      onclick: function(e) {
        this.modal.open()
      }.bind(this)
    }, [this.searchPlaceholder, this.searchCommand])
  }
}

class SearchResultSubHeading {
  constructor() {
    this.itemIcon = el("span.result-item-icon", "#")
    this.link = el("span")
    this.el = el("a.result-subitem", { onclick: function(e) { searchModal.close() } }, [this.itemIcon, this.link])
  }
  update(data) {
    this.link.textContent = data.subheading
    this.el.href = data.url
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
      onclick: function(e) {
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
    this.resetFilter = el("span.reset-filter", { onclick: function(e) { this.resetFilters() }.bind(this) }, 'Clear filters')
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
    this.projects = ["Spin", "Cloud", "Bartholomew"]
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
      },
      {
        project: "Bartholomew",
        link1: ["Quickstart", "/bartholomew/quickstart"],
        link2: ["Templates", "/bartholomew/templates"],
        link3: ["Scripting", "/bartholomew/scripting"],
        link4: ["Shortodes", "/bartholomew/shortcodes"]
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
      placeholder: "Search Fermyon Developer Home", oninput: function(e) {
        this.updateSearch()
      }.bind(this)
    })
    this.searchResults = new SearchResult()
    this.modalSuggest = new ModalSuggest()
    this.modal = el("div.modal-box", { onclick: function(e) { e.stopPropagation() } })
    this.el = el("div.modal-wrapper", {
      onclick: function(e) { this.close() }.bind(this), onkeydown: function(e) {
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
      .map(word => word + '^2 ' + word + '* ')
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
        return
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
    }).sort(function(a, b) { return b.score - a.score }).filter(k => { return k.title != undefined })
    this.searchResults.update(matches)
    setChildren(this.modal, [this.modalSearchBar, this.searchResults])
  }
}

let searchModal = new SearchModal()
let searchButton = new SearchButton(searchModal)

function scrollSideMenu() {
  let sidemenu = document.querySelector("aside.menu")
  if (sidemenu) {
    sidemenu.querySelector(".active")?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
      behavior: 'smooth'
    })
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Initialize after the DOM.
  (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  })();

  header.init();
  hljs.highlightAll();
  if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
  }
  addAnchorLinks()
  scrollSideMenu()
  if (window.location.hash.length > 0) {
    setTimeout(function() {
      document.querySelector('a[href="' + window.location.hash + '"]').click()
    }, 150)
    header.unpin()
  }

  (async function() {
    try {
      await setupSearch()
      mount(document.getElementById("search-button-container"), searchButton);
      mount(document.getElementById("search-modal-container"), searchModal);
      document.onkeydown = function(e) {
        if (e.key == "Escape") {
          searchModal.close()
        }
        if ((e.key == "k" || e.key == "K") && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          e.stopPropagation()
          searchModal.open()
        }
      }
    }
    catch (err) {
      console.err("Could not setup search")
    }
  })()

});
