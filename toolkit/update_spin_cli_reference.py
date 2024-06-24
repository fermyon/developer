# Change the version numbers i.e. 2.4, 2.5 and run
# Fetches file across the web and makes a local markdown file with updated content
import requests

url = "https://raw.githubusercontent.com/fermyon/developer/main/content/spin/v2/cli-reference.md"

def download_markdown(url):
    response = requests.get(url)
    response.raise_for_status() 
    return response.text

def update_markdown_content(content, current_version, new_version):
    updated_content = ""
    blocks = content.split('{{ blockEnd }}')

    for block in blocks[:-1]: 
        updated_content += block + '{{ blockEnd }}'
        if f'{{ startTab "{current_version}"}}' in block:
            new_block = block.replace(f'{{ startTab "{current_version}"}}', f'{{ startTab "{new_version}"}}')
            updated_content += new_block + '{{ blockEnd }}\n'
    updated_content += blocks[-1] 

    return updated_content

def save_updated_content(content, filename="updated_markdown.md"):
    with open(filename, "w") as file:
        file.write(content)

def main():
    original_content = download_markdown(url)
    updated_content = update_markdown_content(original_content, current_version="v2.6", new_version="v2.7")
    save_updated_content(updated_content)
    print("Updated markdown has been saved.")

if __name__ == "__main__":
    main()

