Content must go through a pre-merge checklist.

## Pre-Merge Content Checklist

This documentation has been checked to ensure that:

- [ ] The `title`, `template`, and `date` are all set
- [ ] Does this PR have a new menu item (anywhere in `templates/*.hbs` files) that points to a document `.md` that is set to publish in the future? If so please only publish the `.md` and `.hbs` changes in real-time (otherwise there will be a menu item pointing to a `.md` file that does not exist)
- [ ] File does not use CRLF, but uses plain LF (hint: use `cat -ve <filename> | grep '^M' | wc -l` and expect 0 as a result)
- [ ] Has passed [`bart check`](https://developer.fermyon.com/bartholomew/quickstart)
- [ ] Has been manually tested by running in Spin/Bartholomew (hint: use `PREVIEW_MODE=1` and run `npm run styles` to update styling)
- [ ] Headings are using Title Case
- [ ] Code blocks have the programming language set to properly highlight syntax and the proper copy directive
- [ ] Have tested with `npm run test` and resolved all errors
- [ ] Relates to an existing (potentially outdated) blog article? If so please add URL in blog to point to this content.
