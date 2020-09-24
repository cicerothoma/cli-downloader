const fileDownloader = require("nodejs-file-downloader");
const chalk = require("chalk");
const loadingSpinner = require("loading-spinner");
// const ProgressBar = require("progress");

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

// const progressBar = new ProgressBar("-> downloading [:bar] :percent :etas", {
//   width: 40,
//   complete: "=",
//   incomplete: " ",
//   renderThrottle: 1,
//   total: parseInt(totalLength),
// });

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

    downloader.on("progress", (percentage) => {
      console.log(`Downloading... ${green(percentage)} %`);
    });
    loadingSpinner.start(100, spinnerConfig);

    await downloader.download();
    loadingSpinner.stop();

    console.log(chalk.yellow(`Your File has been downloaded.`));
  } catch (error) {
    loadingSpinner.stop();
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};
