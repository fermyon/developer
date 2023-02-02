const options = {
    "config": {
        "default": false,
        "extends": null,
        // Headings can increment by only one step (h1 -> h2) and not (h1 -> h3)
        "heading-increment": true,
        // Multiple blank lines will throw an error
        "no-multiple-blanks": true,
        // Headings should be surrounded by new lines
        "blanks-around-headings": true,
        // Headings always start on new lines
        "heading-start-left": true,
        // Code blocks must have an empty line above and below them
        "blanks-around-fences": true,
        // There can not be empty spaces in links
        "no-space-in-links": true,
        // Links must always contain url or "#"
        "no-empty-links": true,
        // Images must contain alt texts
        "no-alt-text": true,
        // Enforce consistent style for code blocks
        "code-block-style": {
            "style": "fenced"
        },
        // Enforce consistent fence style for code blocks
        "code-fence-style": {
            "style": "backtick"
        },
        "titlecase-rule": true
    },
    "customRules": ["markdownlint-rule-titlecase"]
}

export default options;