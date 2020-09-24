#!/usr/bin/env node
const { option } = require("commander");
const program = require("commander");
const action = require("./action");
// const exec = require("child_process").exec;

// let execCallback = (error, stdout, stderr) => {
//   if (error) console.log("exec error: " + error);
//   if (stdout) console.log("Result: " + stdout);
//   if (stderr) console.log("shell error: " + stderr);
// };

// let listFunction = (directory, options) => {
//   const cmd = "dir";
//   let params = [];
//   if (options.all) params.push("a");
//   if (options.long) params.push("l");
//   let fullCommand = params.length > 0 ? cmd + " -" + params.join("") : cmd;
//   if (directory) fullCommand += " " + directory;
//   exec(fullCommand, execCallback);
// };
// program
//   .version("0.0.1")
//   .command("list [directory]")
//   .description("List Files and Folder")
//   .option("-a --all", "List all files and folders")
//   .option("-l --long", "")
//   .action(listFunction);
// program.parse(process.argv);

program
  .version("0.0.1")
  .command("file-dl <downloadLink>")
  .description(
    "Download a file from the url specified!! (URL MUST BE A DOWNLOAD LINK)"
  )
  .option(
    "-d, --directory <path>",
    "Directory or path to save currently downloaded file"
  )
  .option("-r, --rename <fileName>", "Rename File")
  .option("-o, --overwrite", "Overwrite existing file with same name")
  .action(action);

program.parse(process.argv);
