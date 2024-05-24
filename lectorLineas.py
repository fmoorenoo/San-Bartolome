import os

def count_lines_in_files(directory):
    file_line_counts = {}
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                file_line_counts[filename] = len(lines)
    return file_line_counts

def main():
    directory = os.path.dirname(os.path.abspath(__file__))
    line_counts = count_lines_in_files(directory)
    total = 0
    for filename, count in line_counts.items():
        total += count
        print(f"Archivo: {filename} - Líneas: {count}")
    print(f"Líneas totales: {total}")

if __name__ == "__main__":
    main()