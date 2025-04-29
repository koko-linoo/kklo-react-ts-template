#!/usr/bin/env node

const path = require("path");
const util = require("util");
const Loader = require("./loader");
const { copyFolderSync } = require("./utils");

const { spawn, exec } = require("child_process");

const execPromise = util.promisify(exec);

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

      console.log("\nProject setup complete!\n");

      console.log("\x1b[33mIf you want to add Mantine to your project, run:\n");
      console.log("\rcd " + appName);
      console.log("\rnpx add-mantine \x1b[0m  \r\n");

      console.log("To run your project, run:");

      console.log("\rnpm run dev \x1b[0m  \r");
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
