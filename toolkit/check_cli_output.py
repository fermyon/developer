import subprocess
import re

def get_help_output(command):
    try:
        result = subprocess.run(command.split(), capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        print(f"Failed to run command {command}: {e}")
        return ""

def extract_subcommands(help_output):
    subcommands = []
    subcommands_section = None
    sections = re.split(r'(SUBCOMMANDS:\s*)', help_output, flags=re.IGNORECASE)
    if len(sections) > 1:
        subcommands_section = sections[2]

    if subcommands_section:
        lines = subcommands_section.splitlines()
        for line in lines:
            match = re.match(r'^\s*([a-zA-Z0-9*-]+)\s', line)
            if match:
                subcommand = match.group(1).strip()
                subcommands.append(subcommand)
    cleaned_list = [subcommand.replace('*', '') for subcommand in subcommands if subcommand != '*']
    return cleaned_list

def recursive_help(command, indent=0, visited=None):
    if visited is None:
        visited = set()
    
    if command in visited:
        return
    
    visited.add(command)
    
    help_output = get_help_output(command)
    print(f"{' ' * indent}Command: {command}")
    print(f"{' ' * indent}Output: {help_output}")

    subcommands = extract_subcommands(help_output)
    for subcommand in subcommands:
        base_command = ' '.join(command.split()[:-1])
        full_command = f"{base_command} {subcommand} --help"
        if full_command in visited:
            continue
        print(f"{' ' * indent}Processing subcommand: {subcommand}")
        print(f"{' ' * indent}{full_command}")
        recursive_help(full_command, indent + 2, visited)

if __name__ == "__main__":
    recursive_help("./spin --help")

