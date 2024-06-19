- [Migration Scripts](#migration-scripts)
  - [Create Mappings](#create-mappings)
  - [Sidebar Unification](#sidebar-unification)
- [Check That All Pages Are Linked to in the Sidebar](#check-that-all-pages-are-linked-to-in-the-sidebar)
- [Position Files and Folders - Ready For Testing](#position-files-and-folders---ready-for-testing)
- [Testing Changes Locally](#testing-changes-locally)
- [Push Changes](#push-changes)


# Migration Scripts

Fork the developer repository, clone your fork, create a new branch, set the remote:

```bash
cd ~
git clone git@github.com:yourusername/developer.git
cd developer
git checkout -b my_new_branch
git remote add upstream https://github.com/fermyon/developer
```

Change into the migration_scripts directory and then run the following scripts:

```bash
cd migration_scripts
```

## Create Mappings

Run the create_url_vs_markdown_file_vs_toc_label_mapping.py script. It will generate a spreadsheet called mapping_information.xlsx which will contain all of the current url paths from the existing spin v2 sidebar template and the cloud sidebar template:

```bash
create_url_vs_markdown_file_vs_toc_label_mapping.py
```

Open the mapping_information.xlsx spreadsheet and fill in the file path and label values that correspond to the url in question. Save the file.

## Sidebar Unification

The following script reads the mappings from above and generates a new sidebar `.hbs` file (that will be the replacement sidebar for the original cloud and spin sidebars):

```bash
python3 create_unified_sidebar.py
``` 

# Check That All Pages Are Linked to in the Sidebar

Run the following script to make sure that all pages on the website are listed in the sidebar, where a user can click and open the page:

```bash
python3 check_that_all_pages_are_linked_to_in_sidebar.py
```

The above script will list all pages with either a cross ❌ or a check mark ✔ next to the file's name (we want all ✔ before we proceed). 

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