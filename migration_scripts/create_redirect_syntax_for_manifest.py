import re
from urllib.parse import urljoin
import requests
import openpyxl

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

# Step 1: Download the raw version of the spin.toml file
url = "https://raw.githubusercontent.com/fermyon/developer/main/spin.toml"
response = requests.get(url)
spin_toml_content = response.text

last_redirect_index = spin_toml_content.rfind("[component.redirect")

new_config_blocks = ""
for entry in mapping_information:
    new_config_block = f"""
# Redirect {entry['original_url_path']} to {entry['unified_url_path']}
[component.redirect-{entry['unified_url_path'].strip('/').replace('/', '-')}] 
source = "modules/redirect.wasm"
environment = {{ DESTINATION = "urljoin('https://developer.fermyon.com', {entry['unified_url_path']})" }}

[[trigger.http]]
id = "trigger-{entry['unified_url_path'].strip('/').replace('/', '-')}"
component = "redirect-{entry['unified_url_path'].strip('/').replace('/', '-')}"
route = "{entry['original_url_path']}"
"""
    new_config_blocks += new_config_block

updated_spin_toml_content = (
    spin_toml_content[:last_redirect_index]
    + spin_toml_content[last_redirect_index:]
    + new_config_blocks
)

with open("updated_spin.toml", "w") as file:
    file.write(updated_spin_toml_content)

print("Updated spin.toml file has been written as 'updated_spin.toml'.")