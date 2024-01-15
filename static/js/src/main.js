const { mount } = redom
import { setupSearch, searchButton, searchModal } from "./modules/search"
import { addAnchorLinks, addCopyButtons, scrollSideMenu, header, blogAd, removeExpiredEvents, changelogFilter } from "./modules/utils"
import { multiTabContentHandler } from "./modules/multiTab"
import { createFeedbackElement } from "./modules/feedback";

document.querySelectorAll('.modal-button').forEach(function (el) {
  el.addEventListener('click', function () {
    var target = document.querySelector(el.getAttribute('data-target'));

    target.classList.add('is-active');
    target.querySelector('.modal-close').addEventListener('click', function () {
      target.classList.remove('is-active');
    });
    target.querySelector('.modal-background').addEventListener('click', function () {
      target.classList.remove('is-active');
    });
  });
});

if (document.body.contains(document.getElementById('blogSlogan'))) {
  blogAd.init();
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize after the DOM.
  (function () {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  })();

  header.init();
  hljs.highlightAll();
  if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
  }
  removeExpiredEvents()
  addAnchorLinks()
  scrollSideMenu()
  // changelogFilter()
  new multiTabContentHandler()
  if (window.location.hash.length > 0) {
    setTimeout(function () {
      document.querySelector('a[href="' + window.location.hash + '"]').click()
    }, 150)
    header.unpin()
  }

  (async function () {
    try {
      await setupSearch()
      mount(document.getElementById("search-button-container"), searchButton);
      mount(document.getElementById("search-modal-container"), searchModal);
      document.onkeydown = function (e) {
        if (e.key == "Escape") {
          searchModal.close()
        }
        if ((e.key == "k" || e.key == "K") && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          e.stopPropagation()
          searchModal.open()
        }
        if (e.key == "s" || e.key == "S") {
          let searchBar = document.getElementById("hub-search-input")
          if (searchBar && document.activeElement != searchBar) {
            e.preventDefault()
            searchBar.focus()
          }
        }
      }
    }
    catch (err) {
      console.error("Could not setup search")
    }
  })()

  // Init feedback on docs pages
  let feedback = document.getElementById("feedback-wrapper")
  if (feedback) {
    createFeedbackElement(feedback)
  }
});

//added for the hub
window.addAnchorLinks = addAnchorLinks
window.addCopyButtons = addCopyButtons
