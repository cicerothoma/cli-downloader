const fileDownloader = require("nodejs-file-downloader");
const chalk = require("chalk");
const ProgressBar = require("progress");

const green = (str) => chalk.green(str);
const downloading = green("-> downloading");

module.exports = async function (link, options) {
  try {
    const downloader = new fileDownloader({
      url: link,
    });
    if (options.directory) {
      downloader.config.directory = options.directory
        ? `./${options.directory}`
        : "./";
    }
    if (options.rename) {
      downloader.config.fileName = options.rename;
    }
    if (options.overwrite) {
      downloader.config.cloneFiles = false;
    }
    const response = await downloader.makeRequest(false);
    const fileSize =
      response.headers["content-length"] || response.headers["Content-Length"];
    const progressBar = new ProgressBar(
      `${downloading} ${chalk.blueBright("[:bar]")} :percent :etas`,
      {
        width: 40,
        complete: "=",
        incomplete: " ",
        renderThrottle: 1,
        total: parseInt(fileSize),
        callback() {
          console.log(chalk.yellow(`File Download Complete!!`));
        },
      }
    );

    downloader.on("progress", (percentage, chunk) => {
      progressBar.tick(chunk.length);
    });

    await downloader.download();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};
