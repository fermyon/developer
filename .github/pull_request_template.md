Content must go through a pre-merge checklist.

## Pre-Merge Content Checklist

This documentation has been checked to ensure that:

- [ ] The `title, `template`, and `date` are all set
- [ ] File does not use CRLF, but uses plain LF (hint: use `cat -ve <filename> | grep '^M' | wc -l` and expect 0 as a result) 
- [ ] Has passed [`bart check`](https://developer.fermyon.com/bartholomew/quickstart)
- [ ] Has run `npm run build-index`
- [ ] Has been manually tested by running in Spin/Bartholomew (hint: use `PREVIEW_MODE=1` and run `npm run styles` to update styling)
- [ ] Headings are using Title Case
- [ ] Code blocks have the programming language set to properly highlight syntax and the proper copy directive
- [ ] Have tested with `npm run test` and resolved all errors
