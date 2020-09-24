const fileDownloader = require("nodejs-file-downloader");
const chalk = require("chalk");
const loadingSpinner = require("loading-spinner");
const ProgressBar = require("progress");

const spinnerConfig = {
  hideCursor: true,
  doNotBlock: true,
  clearLine: true,
  clearChar: true,
};

const green = (str) => chalk.green(str);

// Customize the spinner sequence
loadingSpinner.setSequence(
  [green("|"), green("/"), green("-"), green("\\")] // Sequence of spinner elements
);

module.exports = async function (link, options) {
  try {
    const downloader = new fileDownloader({
      url: link,
    });
    if (options.directory) {
      downloader.config.directory = options.directory
        ? `${__dirname}/${options.directory}`
        : __dirname;
    }
    if (options.rename) {
      downloader.config.fileName = options.rename;
    }
    if (options.overwrite) {
      console.log(options.opts());
      downloader.config.cloneFiles = false;
    }
    const progressBar = new ProgressBar(
      "-> downloading [:bar] :percent :etas",
      {
        width: 40,
        complete: "=",
        incomplete: " ",
        renderThrottle: 1,
        total: 100,
      }
    );

    downloader.on("progress", (chunck) => {
      progressBar.tick(chunck.length);
      //   console.log(chunck);
    });

    downloader.on("end", () => {
      console.log(chalk.yellow("\n File Download Complete"));
    });
    // loadingSpinner.start(100, spinnerConfig);

    await downloader.download();
    console.log();
    // loadingSpinner.stop();

    console.log(chalk.yellow(`Your File has been downloaded.`));
  } catch (error) {
    // loadingSpinner.stop();
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};
