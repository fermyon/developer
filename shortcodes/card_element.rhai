let type = params[0];
let title = params[1];
let summary = params[2];
let url  = params[3];
let tags = params[4];
let deployable = params[5];

let tag_array = tags.split(",");

let tagString = "";

for(item, count) in tag_array {
    tagString += `<span>${item}</span>`
}

let cloud = "";
if (deployable == true) {
    cloud = `<span class="icon"><img src="/static/image/icon/deploy-to-cloud.svg" alt="Cloud"></span>`;
}

return `<div class="column is-one-third-desktop is-full-touch"><a class="card" href="${url}" target="_blank">
<header>
<span class="category">${type}</span>
<div>
${cloud}
<span class="icon"><img src="/static/image/icon/icon-github.svg" alt="GitHub"></span>
</div>
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