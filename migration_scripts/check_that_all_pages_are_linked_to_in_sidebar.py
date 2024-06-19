import os
from pathlib import Path

def construct_paths(base_dir, *sub_dirs):
    return [os.path.join(base_dir, *sub_dir) for sub_dir in sub_dirs]

base_directory = os.path.dirname(__file__)

markdown_file_subdirectories = [
    ["..", "content", "spin", "v2"],
    ["..", "content", "cloud"]
]

handlebars_template_subdirectories = [
    ["latest_sidebar.hbs"]
]

directories = construct_paths(base_directory, *markdown_file_subdirectories)
try:
    menu = construct_paths(base_directory, *handlebars_template_subdirectories)[0]
    if not os.path.exists(menu):
        raise FileNotFoundError(f"The file {menu} does not exist. \nPlease run the create_unified_sidebar.py script and try again.")
    with open(menu, 'r') as file:
        content = file.read()
    for directory in directories:
        print(f"Checking {directory}...")
        for filename in os.listdir(directory):
            f = os.path.join(directory, filename)
            if os.path.isfile(f):
                docFileName = Path(f).stem
                if docFileName in content:
                    print(docFileName + "\U00002714")
                else:
                    print(docFileName + "\U0000274C")
except FileNotFoundError as e:
    print(e)
