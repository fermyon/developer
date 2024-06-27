import re
import os
import shutil
import requests
import openpyxl
from openpyxl import Workbook
from pathlib import Path
from urllib.parse import urljoin

def construct_paths(base_dir, *sub_dirs):
    return [os.path.join(base_dir, *sub_dir) for sub_dir in sub_dirs]

base_directory = os.path.dirname(__file__)

markdown_file_subdirectories = [
    ["..", "content"]
]

def read_excel_to_dict(file_path):
    wb = openpyxl.load_workbook(file_path)
    ws = wb.active
    data = []

    # Skip the header row
    for row in ws.iter_rows(min_row=2, values_only=True):
        original_url_path, unified_url_path, original_file_path, unified_file_path, original_toc_label, unified_toc_label = row
        data.append({
            "original_url_path": original_url_path,
            "unified_url_path": unified_url_path,
            "original_file_path": original_file_path,
            "unified_file_path": unified_file_path,
            "original_toc_label": original_toc_label,
            "unified_toc_label": unified_toc_label
        })
    return data

def update_url_in_markdown(file_path, old_url_path, new_url_path):
    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Define the old URL pattern and the new URL string
    old_url_pattern = f'https://github.com/fermyon/developer/blob/main/content/{old_url_path}.md'
    new_url_string = f'https://github.com/fermyon/developer/blob/main/content/{new_url_path}.md'

    # Update the URL in the front matter
    updated_content = content.replace(old_url_pattern, new_url_string)

    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

    print(f"Updated URL in: {file_path}")

    
file_path = "mapping_information.xlsx"
mapping_information = read_excel_to_dict(file_path)

directory_prefix = construct_paths(base_directory, *markdown_file_subdirectories)[0]

for entry in mapping_information:
    original_file_path = os.path.join(directory_prefix, entry['original_file_path'])
    unified_file_path = os.path.join(directory_prefix, entry['unified_file_path'])
    # Update the URL in the markdown file
    try:
        update_url_in_markdown(original_file_path, entry['original_file_path'], entry['unified_file_path'])
        shutil.move(original_file_path, unified_file_path)
        print(f"Moved: {original_file_path} to {unified_file_path}")
    except FileNotFoundError:
        print(f"File not found: {original_file_path}")
    except Exception as e:
        print(f"Error updating {original_file_path} and  {unified_file_path}: {e}")