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
