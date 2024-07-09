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

def generate_handlebars(sidebar, mapping_information):
    handlebars_content = '<div class="accordion-tabs">\n'
    counter = 0

    def recurse(items, parent_id=''):
        nonlocal counter
        local_handlebars = ''
        if isinstance(items, list):
            local_handlebars += f'        <div class="accordion-menu-item">\n'
            local_handlebars += f'                <input type="checkbox" id="rd{counter}" name="rd">\n'
            label = items[0] if items else "Unnamed Section"
            for mapping in mapping_information:
                original_url_path_from_spreadsheet = "#TODO_URL_MAPPING"
                unified_url_path_from_spreadsheet = "#TODO_URL_MAPPING"
                origial_file_path_from_spreadsheet = "#TODO_FILE_MAPPING"
                unified_file_path_from_spreadsheet = "#TODO_FILE_MAPPING"
                original_toc_label_from_spreadsheet = "#TODO_LABEL_MAPPING"
                unified_toc_label_from_spreadsheet = "#TODO_LABEL_MAPPING"
                print("Comparing: ", mapping["unified_toc_label"])
                print("With: ", label)
                if mapping["unified_toc_label"] == label:
                    print("Match found!")
                    ##TODOneeds to figure out duplicate labels i.e. Introduction, Quickstart, etc.
                    original_url_path_from_spreadsheet = mapping["original_url_path"]
                    unified_url_path_from_spreadsheet = mapping["unified_url_path"]
                    origial_file_path_from_spreadsheet = mapping["original_file_path"]
                    unified_file_path_from_spreadsheet = mapping["unified_file_path"]
                    original_toc_label_from_spreadsheet = mapping["original_toc_label"]
                    unified_toc_label_from_spreadsheet = mapping["unified_toc_label"]
            local_handlebars += f'                <label for="rd{counter}" class="accordion-menu-item-label menu-label">\n'
            local_handlebars += f'                        {label}\n'
            local_handlebars += f'                </label>\n'
            local_handlebars += '                <ul class="menu-list accordion-menu-item-content">\n'
            counter += 1
            for item in items[1:]:
                if isinstance(item, list):
                    local_handlebars += recurse(item)
                else:
                    local_handlebars += f'                        <li><a {{#if (active_project request.spin-full-url "{unified_url_path_from_spreadsheet}")}} class="active" {{/if}} href="{{{{site.info.base_url}}}}{unified_url_path_from_spreadsheet}">{unified_toc_label_from_spreadsheet}</a></li>\n'
            local_handlebars += '                </ul>\n'
            local_handlebars += '        </div>\n'
        return local_handlebars

    for main_item in sidebar['toc']:
        handlebars_content += recurse(main_item)

    handlebars_content += '</div>\n'
    return handlebars_content

def save_handlebars_file(content, filename='docs_sidebar.hbs'):
    with open(filename, 'w') as file:
        file.write(content)

file_path = "mapping_information.xlsx"
mapping_information = read_excel_to_dict(file_path)
#print(mapping_information)

# Generate Handlebars content from the sidebar structure
handlebars_output = generate_handlebars(sidebar_structure, mapping_information)

# Save the generated Handlebars to a file
save_handlebars_file(handlebars_output)

print("Handlebars file generated successfully!")