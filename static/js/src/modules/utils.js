var header = new Headroom(document.querySelector("#topbar"), {
    tolerance: 5,
    offset: 80
});

var blogAd = new Headroom(document.querySelector("#blogSlogan"), {
    tolerance: 5,
    offset: 300
});

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

const svgCopy =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>';
const svgCheck =
    '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="#18d1a5" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';


const addCopyButtons = (clipboard) => {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
        let content = codeBlock.innerText.trim()
        let isComment = codeBlock.parentNode.previousSibling.previousSibling
        if (isComment && isComment.nodeName == "#comment") {
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

export { scrollSideMenu, addCopyButtons, addAnchorLinks, header, blogAd}