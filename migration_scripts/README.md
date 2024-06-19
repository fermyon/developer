- [Migration Scripts](#migration-scripts)
  - [Sidebar Unification](#sidebar-unification)
- [Check That All Pages Are Linked to in the Sidebar](#check-that-all-pages-are-linked-to-in-the-sidebar)
- [Position Files and Folders - Ready For Testing](#position-files-and-folders---ready-for-testing)
- [Testing Changes Locally](#testing-changes-locally)
- [Push Changes](#push-changes)


# Migration Scripts

## Sidebar Unification

The following script generates a new sidebar `.hbs` file (that will be the replacement sidebar for the original cloud and spin sidebars):

```bash
python3 create_unified_sidebar.py
``` 

# Check That All Pages Are Linked to in the Sidebar

Run the following script to make sure that all pages on the website are listed in the sidebar, where a user can click and open the page:

```bash
python3 check_that_all_pages_are_linked_to_in_sidebar.py
```

# Position Files and Folders - Ready For Testing

```bash
# Put the freshly generated sidebar file into place
mv latest_sidebar.hbs ../templates/latest_sidebar.hbs
```

# Testing Changes Locally

Perform the following to test changes locally:

```bash
cd ../../developer
npm ci
cd spin-up-hub
npm ci
cd ../../developer
spin build
spin up -e PREVIEW_MODE=1
```

# Push Changes

```bash
git add .
git commit -S --signoff -m "Adding new unification structure"
git push origin unification
```