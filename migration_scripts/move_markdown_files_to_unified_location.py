import re
import os
import requests
import openpyxl
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

file_path = "mapping_information.xlsx"
mapping_information = read_excel_to_dict(file_path)

directory_prefix = construct_paths(base_directory, *markdown_file_subdirectories)[0]

for entry in mapping_information:
    original_file_path = os.path.join(directory_prefix, entry['original_file_path'])
    unified_file_path = os.path.join(directory_prefix, entry['unified_file_path'])
    try:
        shutil.move(original_file_path, unified_file_path)
        print(f"Moved: {original_file_path} to {unified_file_path}")
    except FileNotFoundError:
        print(f"File not found: {original_file_path}")
    except Exception as e:
        print(f"Error moving file {original_file_path} to {unified_file_path}: {e}")
