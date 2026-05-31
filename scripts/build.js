const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

function rimraf(dir) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
        return;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
}

rimraf(dist);
fs.mkdirSync(dist, { recursive: true });

const copyDirs = ["pages", "css", "js", "partials", "assets"];
for (const dir of copyDirs) {
    const src = path.join(root, dir);
    if (fs.existsSync(src)) {
        copyRecursive(src, path.join(dist, dir));
    }
}

const indexHtml = path.join(root, "index.html");
if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, path.join(dist, "index.html"));
}

console.log("Build complete → dist/");
