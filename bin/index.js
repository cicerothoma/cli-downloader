#!/usr/bin/env node

const commander = require("commander");
const action = require("../lib/action");

const program = new commander.Command();

program
  .version("0.1.0", "-v, --version", "prints script version")
  .command("dl <downloadLink>")
  .description(
    "Download a file from the url supplied! (URL MUST BE A DOWNLOAD LINK)"
  )
  .option(
    "-d, --directory <path>",
    "Directory or path to save currently downloaded file"
  )
  .option("-r, --rename <fileName>", "Rename File")
  .option("-o, --overwrite", "Overwrite existing file with same name")
  .action(action);

program.parse(process.argv);
