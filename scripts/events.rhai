// Get just the upcoming events, excluding expired events.
//
// To use this:
// {{#with (newest_event site.pages)}} {{this.page.head.title}} {{/with}}

// Param 1 should be `site.pages`
let pages = params[0];

// If no pages match, this is default content.
let newest_event = #{date: "0", uri: "/events/index", page: #{head: #{title: "No upcoming events."}}};

// Get each event item, assigning it to {path: object}.
for item in pages.keys() {
    if item.index_of("/content/events/") == 0 && pages[item].head.extra.type == "event" {
        // Remove /content and .md
        let path = item.sub_string(8);
        let page = pages[item];
        path = path.sub_string(0, path.index_of(".md"));

        // If this page is newer than the last newest page,
        // set this as the newest page.
        let date = page.head.date;
        if date > newest_event.extra.eventexpires {
            newest_event = #{
                date: date,
                uri: path,
                page: page,
            };
        }
    }
}
newest_event
