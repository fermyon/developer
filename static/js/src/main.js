const { el, mount, text, list, setChildren, setStyle, setAttr } = redom
import {setupSearch, searchButton, searchModal} from "./modules/search"
import {addAnchorLinks, addCopyButtons, scrollSideMenu, header, blogAd} from "./modules/utils"
import { multiTabContentHandler} from "./modules/multiTab"

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
  addAnchorLinks()
  scrollSideMenu()
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
      }
    }
    catch (err) {
      console.err("Could not setup search")
    }
  })()

});