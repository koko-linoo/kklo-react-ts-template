#!/usr/bin/env node

const path = require("path");
const util = require("util");
const Loader = require("./loader");
const { copyFolderSync } = require("./utils");
const { exec } = require("child_process");

const execPromise = util.promisify(exec);

async function createApp() {
  const filename = path.resolve(process.cwd());

  const initTimer = new Loader("Adding Mantine Template");
  initTimer.start();

  copyFolderSync(path.join(__dirname, "mantine-template"), filename);
  initTimer.stop();

  const depenTimer = new Loader("Installing dependencies");

  depenTimer.start();
  await execPromise(
    `cd ${filename} && npm install @mantine/core @mantine/hooks @mantine/form @mantine/modals @mantine/notifications @mantine/colors-generator @tabler/icons-react`
  );
  depenTimer.stop();

  const devTimer = new Loader("Installing dev dependencies");

  devTimer.start();
  await execPromise(
    `cd ${filename} && npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars`
  );
  devTimer.stop();

  console.log("Project setup complete!");
}

createApp();
