- [Prerequisites](#prerequisites)
- [Migration Scripts](#migration-scripts)
- [Backup Content and Config](#backup-content-and-config)
- [Create Mappings](#create-mappings)
- [Move files](#move-files)
- [Create redirects](#create-redirects)
- [Sidebar Unification](#sidebar-unification)
- [Check That All Pages Are Linked to in the Sidebar](#check-that-all-pages-are-linked-to-in-the-sidebar)
- [Position Files and Folders - Ready For Testing](#position-files-and-folders---ready-for-testing)
- [Testing Changes Locally](#testing-changes-locally)
- [Push Changes](#push-changes)
- [Clean Up](#clean-up)

# Prerequisites

```bash
pip3 install openpyxl
pip3 install requests
```

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

# Backup Content and Config

Run the following shell script to make it easy to reset (iterate while making decisions about the migration)

```bash
./backup_content.sh
```

# Create Mappings

Run the create_url_vs_markdown_file_vs_toc_label_mapping.py script. It will generate a spreadsheet called mapping_information.xlsx which will contain all of the current url paths from the existing spin v2 sidebar template and the cloud sidebar template:

```bash
python3 create_url_vs_markdown_file_vs_toc_label_mapping.py
```

Open the mapping_information.xlsx spreadsheet and fill in the:
- unified_url_path (the new url where the resource will be found online i.e. `/spin/v2/quickstart` vs `/docs/quickstart` etc.)
- unified_file_path (the new file path where the markdown file will live i.e. `/spin/v2/quickstart` vs `/docs/quickstart` etc.)
- unified_toc_label (the label that will appear in the ToC for that given markdown file)

> **Please note** - the new labels have already been decided. See the `sidebar_structure.py` file for label strings to use in the spreadsheet (you are essentially mapping ToC labels to existing markdown files recorded in the spreadsheet). **A label that you add to the spreadsheet's `unified_toc_label` has to exactly match one of the text entries in the `sidebar_structure.py` file. Change one or the other until you have a match to ensure that the generation of the `unified_sidebar.hbs` will succeed.**

Save the Excel spreadsheet file back to the same location before proceeding with any of the following scripts.

# Move files

Run the following scripts to move files to their new location on disk:

```bash
python3 move_markdown_files_to_unified_location.py
```

> If you are not satisfied with the outcome of this script, please run `./reset_content.sh` and try again.


Check that no files are left over in either `/spin/v2` or `/cloud` directories (except for cloud changelog which should stay where it is).

# Create redirects

Run the following scripts to generate the redirect code for the spin.toml file:

```bash
python3 create_redirect_syntax_for_manifest.py
```

The script above will generate a new `updated_spin.toml` file.

> If you are not satisfied with the outcome of this script, please re-run it. The `updated_spin.toml` file will be overwritten automatically.

Go ahead and copy the `spin.toml` file from the migration_scripts directory, over to the application's root:

```bash
mv updated_spin.toml ../spin.toml
```

# Sidebar Unification

The following script reads the mappings from above and generates a new sidebar `.hbs` file (that will be the replacement sidebar for the original cloud and spin sidebars):

```bash
python3 create_unified_sidebar.py
``` 

> If you are not satisfied with the outcome of this script, just re-run it. It will override the `docs_sidebar.hbs` file automatically.

# Check That All Pages Are Linked to in the Sidebar

Run the following script to make sure that all pages on the website are listed in the sidebar, where a user can click and open the page:

```bash
python3 check_that_all_pages_are_linked_to_in_sidebar.py
```

The above script will list all pages with either a cross ❌ or a check mark ✔ next to the file's name (we want all ✔ before we proceed). 

# Position Files and Folders - Ready For Testing

```bash
# Put the freshly generated sidebar file into place
mv docs_sidebar.hbs ../templates/docs_sidebar.hbs
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

# Clean Up

Please run the `./clean_up_after_migration.sh` once the changes are approved and merged.