import os

source_dir = r"c:\Users\DELL\OneDrive\Desktop\Ai platforms"
exclude_dirs = {"node_modules", ".venv", ".next", ".pytest_cache", "__pycache__", ".git", "scratch", "coverage", "dist", "build"}
valid_extensions = {".py", ".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".sql", ".sh"}

total_files = 0
total_loc = 0
by_lang = {}

for root, dirs, files in os.walk(source_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    if "nexus_tests" in root:
        continue
    for file in files:
        ext = os.path.splitext(file)[1]
        if ext in valid_extensions:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    lines = [line.strip() for line in f.readlines() if line.strip() and not line.strip().startswith("#") and not line.strip().startswith("//")]
                    loc = len(lines)
                    total_files += 1
                    total_loc += loc
                    lang = ext[1:].upper()
                    by_lang[lang] = by_lang.get(lang, 0) + loc
            except Exception:
                pass

print(f"Total Prod Files: {total_files}")
print(f"Total Prod LOC: {total_loc}")
print(f"Breakdown: {by_lang}")
