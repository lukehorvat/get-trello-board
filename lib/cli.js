#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import pkg from "../package.json";
import getTrelloBoard, { NotFoundError } from "./";

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("KEY"), chalk.underline("TOKEN"), chalk.underline("BOARD ID/URL"))}`)
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv._.length !== 3) {
  yargs.showHelp();
  console.error(chalk.red("Key, token, and board ID/URL must be specified."));
  process.exit(1);
}

const [ key, token, idOrUrl ] = argv._;

getTrelloBoard(
  key,
  token,
  idOrUrl
).then(board => {
  console.log(chalk.green(JSON.stringify(board, null, 2)));
  process.exit();
}).catch(error => {
  console.error(chalk.red(error instanceof NotFoundError ? "Board not found." : "An unexpected error occurred."));
  process.exit(1);
});
