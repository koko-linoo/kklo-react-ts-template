#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const util = require("util");
const Loader = require("./loader");

const { spawn, execSync, exec } = require("child_process");

const execPromise = util.promisify(exec);

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

function loadingTimer(message) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${message} ${frames[i++ % frames.length]}`);
  }, 80);
  return interval;
}

function createApp(appName) {
  const appPath = path.resolve(process.cwd());

  const initTimer = new Loader("Initialize project");
  initTimer.start();
  const createVite = spawn(
    "npm",
    ["create", "vite@latest", `${appName}`, "--", "--template", "react-swc-ts"],
    {
      cwd: appPath,
      shell: true,
    }
  );

  createVite.on("close", async (code) => {
    if (code === 0) {
      const filename = path.join(appPath, appName);
      copyFolderSync(path.join(__dirname, "template"), filename);
      initTimer.stop();

      const depenTimer = new Loader("Installing dependencies");

      depenTimer.start();
      await execPromise(`cd ${filename} && npm install axios`);
      await execPromise(`cd ${filename} && npm install react-router-dom`);
      await execPromise(`cd ${filename} && npm install @tanstack/react-query`);
      await execPromise(`cd ${filename} && npm install zustand`);
      await execPromise(`cd ${filename} && npm install encrypt-storage`);
      depenTimer.stop();

      const devTimer = new Loader("Installing dev dependencies");

      devTimer.start();
      await execPromise(`cd ${filename} && npm install -D @types/node`);
      devTimer.stop();

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
