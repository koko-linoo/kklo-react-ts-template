#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function createApp() {
  const appPath = path.resolve(process.cwd());
  fs.mkdirSync(appPath, { recursive: true });

  console.log(`Initializing a new project in ${appPath}`);

  copyFolderSync(path.join(__dirname, "template"), appPath);

  console.log("Installing dependencies...");

  execSync(
    `cd ${appPath} && npm install axios react-router-dom @tanstack/react-query`
  );

  execSync(`npm install -D @types/node @vitejs/plugin-react`);

  console.log("Project setup complete!");
}

createApp();
