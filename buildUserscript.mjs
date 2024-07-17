// type userscriptHeader.txt > dist\\tmp.js && echo: >> dist\\tmp.js && echo: >> dist\\tmp.js && type dist\\bundle.user.js >> dist\\tmp.js && move /y dist\\tmp.js dist\\bundle.user.js

import fs from "node:fs";

try {
    let sourceFile = "./dist/bundle.user.js";
    if (!fs.existsSync(sourceFile)) process.exit();
    
    let code = fs.readFileSync(sourceFile, "utf-8");
    if (code.match("// ==UserScript==")) process.exit();
    
    let header = fs.readFileSync("userscriptHeader.txt", "utf-8");
    let content = header + "\n\n" + code;

    fs.writeFileSync(sourceFile, content);
    fs.rmSync("./dist/js", { recursive: true, force: true });
    
} catch (err) {
    console.log(err);
}