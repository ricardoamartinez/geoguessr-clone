import os

def generate_tree(startpath, output_file):
    important_dirs = ['src', 'public', 'pages', 'components', 'contexts', 'hooks', 'lib', 'styles', 'types']
    important_files = ['.env.local', 'next.config.js', 'package.json', 'tailwind.config.js', 'tsconfig.json']

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("geoguessr-clone/\n")
        for root, dirs, files in os.walk(startpath):
            level = root.replace(startpath, '').count(os.sep)
            if level == 0:
                dirs[:] = [d for d in dirs if d in important_dirs]
            indent = '│   ' * level + '├── '
            if os.path.basename(root) in important_dirs:
                f.write(f'{indent}{os.path.basename(root)}/\n')
            for file in files:
                if file in important_files or (level > 0 and file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css'))):
                    sub_indent = '│   ' * (level + 1) + '├── '
                    f.write(f'{sub_indent}{file}\n')

# Use the current directory as the start path
start_path = '.'
output_file = 'directory_tree.txt'

generate_tree(start_path, output_file)
print(f"Simplified directory tree has been saved to {output_file}")