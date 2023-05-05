// This function lists all of the blog posts, subject to the constraints.
//
// It returns an array of objects of the form:
//  [
//    #{ 
//       uri: "path/to/page", 
//       page: {
//          head: {title: "some title", description: "Some description", ...}
//          body: "This is the HTML"
//       }
//     }
// ]
//
// The array is sorted with the earlier items being most recent, and the oldest items at the end.

// Param 1 should be `site.pages`
let pages = params[0];

// Loop through them and return all of the page objects that are in
// the blog path.

let blog_pages = [];

// Get each blog post, assigning it to {path: object}.
let keys = pages.keys();
for item in keys {
    if item.index_of("/content/events/") == 0 && pages[item].head.extra.type == "event" {
        // Remove /content and .md
        let path = item.sub_string(8);
        let page = pages[item];
        path = path.sub_string(0, path.index_of(".md"));
        
        blog_pages.push(#{
            uri: path,
            page: page,
            template: "blog",
        });
        //blog_pages[path] = pages[item];
    }
   
}

fn sort_by_date(a, b) {
    if a.page.head.extra.eventexpires < b.page.head.extra.eventexpires {
        -1
    } else {
        1
    }
}

// Sort by the value of the page date.
blog_pages.sort(Fn("sort_by_date"));

blog_pages
