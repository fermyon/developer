// Param 1 should be `site.pages`
// Param 2 should be a string that provides the path of the folder
// Param 2 should be a string that identifies the type of content
let pages = params[0];
let content_identifier = params[1];
let content_type = params[2];

let content_pages = [];

// Get each news post, assigning it to {path: object}.
let keys = pages.keys();
for item in keys {
    if item.index_of(content_identifier) == 0 && pages[item].head.extra.type == content_type {
        // Remove /content and .md
        let path = item.sub_string(8);
        let page = pages[item];
        path = path.sub_string(0, path.index_of(".md"));
        
        content_pages.push(#{
            uri: path,
            page: page,
            template: "news-item",
        });
        //news_pages[path] = pages[item];
    }
   
}

// Return the news items sorted newest to oldest
fn sort_by_date(a, b) {
    if a.page.head.date < b.page.head.date {
        1
    } else {
        -1
    }
}

// Sort by the value of the page date.
content_pages.sort(Fn("sort_by_date"));

content_pages