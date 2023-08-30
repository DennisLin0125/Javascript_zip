# 專案介紹 : 壓縮Javascript

### 運行環境需求  

* `python`
* `node.js`

### 參考

* [連結](https://github.com/google/closure-compiler)

### 在 Local 端安裝 `google-closure-compiler`

```bash
npm i -g google-closure-compiler
```

### zip.js

```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 定義路徑
const dDrivePath = "D:\\";

// 來源資料夾
const srcDir = "js_src";

// 建立名為 "httpd" 的資料夾
const httpdFolder = path.join(dDrivePath, "httpd");
fs.mkdirSync(httpdFolder, { recursive: true });

// 建立名為 "excel" 的子資料夾
const excelFolder = path.join(httpdFolder, "excel");
fs.mkdirSync(excelFolder, { recursive: true });

// 建立名為 "js" 的子資料夾
const jsFolder = path.join(httpdFolder, "js");
fs.mkdirSync(jsFolder, { recursive: true });

const files = [];

// 定義遞迴函式來列出資料夾內的所有檔案
function listFilesRecursive(dirPath) {
    const dirents = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const dirent of dirents) {
        const fullPath = path.join(dirPath, dirent.name);
        if (dirent.isFile() && dirent.name.toLowerCase().endsWith(".js") &&
            dirent.name.toLowerCase() !== "jexcel.js" && dirent.name.toLowerCase() !== "jsuites.js") {
            files.push(fullPath);
            console.log(dirent.name);
        } else if (dirent.isDirectory()) {
            listFilesRecursive(fullPath); // 遞迴進入子資料夾
        }
    }
}

listFilesRecursive(srcDir);

console.log("Number of files found:", files.length);

files.forEach((file) => {
    let outputFilePath = '';
    if (file === `${srcDir}\\javascript.js`) {
        outputFilePath = path.join(httpdFolder, path.basename(file));
    } else if (file === `${srcDir}\\excel\\main_excel.js`) {
        outputFilePath = path.join(excelFolder, path.basename(file));
    } else if (file.startsWith(`${srcDir}\\js\\`)) {
        outputFilePath = path.join(jsFolder, path.basename(file));
    }

    outputFilePath = outputFilePath.replace(/\\/g, "/").replace(/\.js$/, ".min.js");

    if (outputFilePath) {
        const cmd = `google-closure-compiler.cmd ${file} --emit_use_strict --js_output_file ${outputFilePath}`;
        execSync(cmd, { shell: true });
        console.log(`${outputFilePath}.....OK`);
    }else{
        console.log("無檔案被轉換....");
    }
});

```

### zip.py

```python
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


```