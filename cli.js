#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn, execSync } = require("child_process");

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

function createApp(appName) {
  const appPath = path.resolve(process.cwd());

  console.log(`Creating a new project in ${appPath}`);

  console.log("Initializing a new project in " + appPath);

  const createVite = spawn(
    "npm",
    ["create", "vite@latest", `${appName}`, "--", "--template", "react-swc-ts"],
    {
      cwd: appPath,
      shell: true,
    }
  );

  createVite.stdout.on("data", (data) => console.log(data.toString()));
  createVite.stderr.on("data", (data) => console.error(data.toString()));

  createVite.on("close", (code) => {
    if (code === 0) {
      console.log(`${appName} created successfully!`);
      const projectPath = path.join(appPath, appName);
      copyFolderSync(path.join(__dirname, "template"), projectPath);

      console.log("Installing dependencies...");
      execSync(`cd ${projectPath} && npm install`);

      execSync(
        `cd ${projectPath} && npm install axios react-router-dom @tanstack/react-query`
      );

      execSync(`cd ${projectPath} && npm install -D @types/node`);

      console.log("Project setup complete!");
    } else {
      console.error(`Installation failed with code ${code}`);
    }
  });
}

const args = process.argv.slice(2);
const appName = args[0];

if (!appName) {
  console.error("Please specify a project name.");
  process.exit(1);
}

createApp(appName);
