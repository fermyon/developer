let type = params[0];
let title = params[1];
let summary = params[2];
let url  = params[3];
let tags = params[4];

let tag_array = tags.split(",");

let tagString = "";

for(item, count) in tag_array {
    tagString += `<span>${item}</span>`
}

return `<div class="column is-one-third-desktop is-full-touch"><a class="card" href="${url}" target="_blank">
<header>
<span class="category">${type}</span>
<span class="icon"><img src="/static/image/icon/icon-github.svg" alt="GitHub"></span>
</header>
<article>
<h3>${title}</h3>
<p class="summary">
${summary}
</p>
<div class="tags">
${tagString}
</div>
</article>
</a></div>`;