import re
import requests
import openpyxl
from sidebar_structure import sidebar_structure

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

# Function to generate Handlebars template using actual elements and attributes from the original templates
def generate_handlebars_template(structure, indent=0, idx=0):
    handlebars = ""
    for key, value in structure.items():
        current_id = f"rd{idx}"
        if isinstance(value, dict):
            handlebars += ' ' * indent + f'<div class="accordion-menu-item">\n'
            handlebars += ' ' * indent + f'  <input type="checkbox" id="{current_id}" name="rd">\n'
            handlebars += ' ' * indent + f'  <label for="{current_id}" class="accordion-menu-item-label menu-label">\n'
            handlebars += ' ' * indent + f'    {key}\n'
            handlebars += ' ' * indent + f'  </label>\n'
            handlebars += ' ' * indent + f'  <ul class="menu-list accordion-menu-item-content">\n'
            handlebars += generate_handlebars_template(value, indent + 4, idx + 1)
            handlebars += ' ' * indent + f'  </ul>\n'
            handlebars += ' ' * indent + f'</div>\n'
        elif isinstance(value, list):
            if len(value) > 0 and isinstance(value[0], dict):
                handlebars += ' ' * indent + f'<div class="accordion-menu-item">\n'
                handlebars += ' ' * indent + f'  <input type="checkbox" id="{current_id}" name="rd">\n'
                handlebars += ' ' * indent + f'  <label for="{current_id}" class="accordion-menu-item-label menu-label">\n'
                handlebars += ' ' * indent + f'    {key}\n'
                handlebars += ' ' * indent + f'  </label>\n'
                handlebars += ' ' * indent + f'  <ul class="menu-list accordion-menu-item-content">\n'
                for item in value:
                    handlebars += generate_handlebars_template(item, indent + 4, idx + 1)
                handlebars += ' ' * indent + f'  </ul>\n'
                handlebars += ' ' * indent + f'</div>\n'
            else:
                handlebars += ' ' * indent + f'<div class="accordion-menu-item">\n'
                handlebars += ' ' * indent + f'  <input type="checkbox" id="{current_id}" name="rd">\n'
                handlebars += ' ' * indent + f'  <label for="{current_id}" class="accordion-menu-item-label menu-label">\n'
                handlebars += ' ' * indent + f'    {key}\n'
                handlebars += ' ' * indent + f'  </label>\n'
                handlebars += ' ' * indent + f'  <ul class="menu-list accordion-menu-item-content">\n'
                #for item in value:
                #    link = spin_links.pop(0) if spin_links else "#"
                #    handlebars += ' ' * (indent + 4) + f'    <li><a href="{link}" class="accordion-link">{item}</a></li>\n'
                # TODOAdd the actual URL mappings here {URL_MAPPING, FILE_MAPPING, LABEL_MAPPING}
                # Perhaps pickle the create_url_vs_markdiwn_file_vs_toc_label_mapping.py's output and load it in here for dynamically generating the URL, File and Label mappings
                # For example, links_data[0]["url_path"] will give the URL mapping for the first link - figure out how to iterate and match up the values for use here
                handlebars += ' ' * (indent + 4) + f'<li><a {{#if (active_project request.spin-full-url "#TODO_URL_MAPPING" )}} class="active" {{/if}} href="{{site.info.base_url}}#TODO_FILE_MAPPING">#TODO_LABEL_MAPPING</a></li>\n'
                # Above line is a placeholder for the actual URL, File and Label mappings
                handlebars += ' ' * indent + f'  </ul>\n'
                handlebars += ' ' * indent + f'</div>\n'
        else:
            handlebars += ' ' * indent + f'<div class="accordion-menu-item">\n'
            handlebars += ' ' * indent + f'  <input type="checkbox" id="{current_id}" name="rd">\n'
            handlebars += ' ' * indent + f'  <label for="{current_id}" class="accordion-menu-item-label menu-label">\n'
            handlebars += ' ' * indent + f'    {key}\n'
            handlebars += ' ' * indent + f'  </label>\n'
            handlebars += ' ' * indent + f'  <ul class="menu-list accordion-menu-item-content">\n'
            handlebars += ' ' * indent + f'  </ul>\n'
            handlebars += ' ' * indent + f'</div>\n'
        idx += 1
    return handlebars

# Generating the combined sidebar Handlebars template
handlebars_template = f"""
<div class="accordion-tabs">
    {generate_handlebars_template(sidebar_structure)}
</div>
"""

# Save the Handlebars template to a file
with open("docs_sidebar.hbs", "w") as file:
    file.write(handlebars_template)

print("Combined sidebar Handlebars template generated successfully.")