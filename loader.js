const warn = "\x1b[33m";
const clear = "\x1b[0m";
const success = "\x1b[32m";

class Loader {
  constructor(name) {
    this.name = name;
    this.intervalId = null;
  }

  start() {
    let i = 0;
    const x = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    if (this.intervalId !== null) return;
    this.intervalId = setInterval(() => {
      process.stdout.write(`\r${x[i++ % x.length]} ${warn}${this.name}`);
    }, 80);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log(`\r${success}✔ ${this.name} completed ${clear} \r`);
    }
  }
}

module.exports = Loader;
