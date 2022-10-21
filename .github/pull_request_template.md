Content must go through a pre-merge checklist.

## Pre-Merge Content Checklist

This documentation has been checked to ensure that:

- [ ] The `title`, `template` and `date` are all set
- [ ] File does not use CRLF, but uses plain LF (hint: use `cat -ve <filename> | grep '^M' | wc -l` and expect 0 as a result) 
- [ ] Has passed `bart check`
- [ ] Has been manually tested by running in Spin/Bartholomew (hint: use `PREVIEW_MODE=1`)
- [ ] Headings are using Title Case
- [ ] Code blocks have the programming language set in order to properly highlight syntax
