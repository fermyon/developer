// This function lists all of the pages, subject to the constraints.
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

// Loop through them and return all of the page objects that are in the specified path.
let spin_pages = [];

// Get each page, assigning it to {path: object}.
let keys = pages.keys();
for item in keys {
    if item.index_of("/content/spin/") == 0 {
        // Remove /content and .md
        let path = item.sub_string(8);
        let page = pages[item];
        path = path.sub_string(0, path.index_of(".md"));
        
        spin_pages.push(#{
            uri: path,
            page: page,
            // The template to use for these pages
            template: "spin_main",
        });
    }
   
}

spin_pages
