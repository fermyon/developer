var header = new Headroom(document.querySelector("#topbar"), {
    tolerance: 5,
    offset : 80
});

var blogAd = new Headroom(document.querySelector("#blogSlogan"), {
  tolerance: 5,
  offset : 300
});

document.querySelectorAll('.modal-button').forEach(function(el) {
  el.addEventListener('click', function() {
    var target = document.querySelector(el.getAttribute('data-target'));
    
    target.classList.add('is-active');
    target.querySelector('.modal-close').addEventListener('click',   function() {
        target.classList.remove('is-active');
    });
    target.querySelector('.modal-background').addEventListener('click',   function() {
        target.classList.remove('is-active');
     });
  });
});

document.addEventListener("DOMContentLoaded", function(){
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
});

if (document.body.contains(document.getElementById('blogSlogan'))){
  blogAd.init();
};

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>';
const svgCheck =
  '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="#18d1a5" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';


const addCopyButtons = (clipboard) => {
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    let button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.ariaLabel = "Copy code"
    button.innerHTML = svgCopy;
    button.addEventListener("click", () => {
      clipboard.writeText(codeBlock.innerText).then(
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


