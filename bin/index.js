#!/usr/bin/env node

const commander = require("commander");
const action = require("../lib/action");

const program = new commander.Command();

program
  .version("0.1.0", "-v, --version", "prints script version")
  .description(
    "Download a file from the url specified!! (URL MUST BE A DOWNLOAD LINK)"
  )
  .command("dl <downloadLink>")
  .option(
    "-d, --directory <path>",
    "Directory or path to save currently downloaded file"
  )
  .option("-r, --rename <fileName>", "Rename File")
  .option("-o, --overwrite", "Overwrite existing file with same name")
  .action(action);

program.parse(process.argv);
