import re
import openpyxl
from openpyxl import Workbook
import requests

# Remove formatting from the Handlebars template
def remove_formatting(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\t+', '', text)
    text = re.sub(r'\n+', '', text)
    return text

# Function to fetch the content of a file from a GitHub repository
def fetch_file_from_github(repo, filepath):
    url = f"https://raw.githubusercontent.com/{repo}/main/{filepath}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Failed to fetch {filepath} from {repo}")

repo = "fermyon/developer"
original_spin_sidebar_v2 = fetch_file_from_github(repo, "templates/spin_sidebar_v2.hbs")
spin_sidebar_v2 = remove_formatting(original_spin_sidebar_v2)
original_cloud_sidebar = fetch_file_from_github(repo, "templates/cloud_sidebar.hbs")
cloud_sidebar = remove_formatting(original_cloud_sidebar)

#print(f"Cleaned Spin Sidebar Content\n{spin_sidebar_v2}")
#print(f"Cleaned Cloud Sidebar Content\n{cloud_sidebar}")

# Parsing the original Handlebars templates to extract links
def extract_links(handlebars_template):
    pattern = r'"{{site\.info\.base_url}}(/(?:spin/v2|cloud|wasm-languages|static/image)/[\.a-zA-Z0-9/-]*)">([^<]+)</a>'
    matches = re.findall(pattern, handlebars_template)
    print(f"Found {matches} links in the sidebar.")
    return [match for match in matches]

spin_links = extract_links(spin_sidebar_v2)
print(f"Extracted {len(spin_links)} links from the Spin sidebar.")
cloud_links = extract_links(cloud_sidebar)
print(f"Extracted {len(cloud_links)} links from the Cloud sidebar.")

# Combine the links from both templates
all_links = spin_links + cloud_links

# Create a new Excel workbook and select the active worksheet
wb = Workbook()
ws = wb.active
ws.title = "Links"

# Write the headers
ws.append(["original_url_path", "unified_url_path", "original_file_path", "unified_file_path", "original_toc_label", "unified_toc_label"])

# Write the links to column A and leave columns B and C blank
for link in all_links:
    ws.append([link[0], "/docs/",link[0], "/docs/", link[1], ""])

# Save the workbook to a file
wb.save("mapping_information.xlsx")

print("Links have been written to mapping_information.xlsx")