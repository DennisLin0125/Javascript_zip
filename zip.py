import os
import re
import subprocess

# 定義路徑
d_drive_path = "D:\\"

# 來源資料夾
src_dir = "js_src"

# 建立名為 "httpd" 的資料夾
httpd_folder = os.path.join(d_drive_path, "httpd")
os.makedirs(httpd_folder, exist_ok=True)

# 建立名為 "excel" 的子資料夾
excel_folder = os.path.join(httpd_folder, "excel")
os.makedirs(excel_folder, exist_ok=True)

# 建立名為 "js" 的子資料夾
js_folder = os.path.join(httpd_folder, "js")
os.makedirs(js_folder, exist_ok=True)

files = []
for root, _, filenames in os.walk(os.path.join(".", src_dir)):
    for filename in filenames:
        if filename.lower() not in ["jexcel.js", "jsuites.js"] and filename.endswith(".js"):
            files.append(os.path.join(root, filename))
            print(filename)

print("Number of files found:", len(files))

for file in files:
    output_file = ""
    if file.startswith(f".\\{src_dir}\\js\\"):
        output_file = file.replace(f".\\{src_dir}\\js\\", '')
        output_file = (f'{js_folder}\\{output_file}').replace("\\", "/")
    elif file.startswith(f".\\{src_dir}\\excel\\"):
        output_file = file.replace(f".\\{src_dir}\\excel\\", '')
        output_file = (f'{excel_folder}\\{output_file}').replace("\\", "/")
    elif file.startswith(f".\\{src_dir}\\"):
        output_file = file.replace(f".\\{src_dir}\\", '')
        output_file = (f'{httpd_folder}\\{output_file}').replace("\\", "/")

    output_file = re.sub(r'\.js$', '.min.js', output_file)

    if(output_file):
        arguments = f"google-closure-compiler.cmd {file} --emit_use_strict --js_output_file {output_file}"
        subprocess.run(arguments, shell=True)
        print(f"{output_file}.....OK")
    else:
        print(f"無檔案被轉換.....")

