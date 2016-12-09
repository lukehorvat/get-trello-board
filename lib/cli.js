#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import pkg from "../package.json";
import getTrelloBoard from "./";

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("<ID/URL>"))}`)
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

if (argv._.length !== 1) {
  yargs.showHelp();
  console.error(chalk.red("A board ID or URL must be specified."));
  process.exit(1);
}

getTrelloBoard(
  process.env.TRELLO_KEY,
  process.env.TRELLO_TOKEN,
  String(argv._[0])
).then(board => {
  console.log(chalk.green(JSON.stringify(board, null, 2)));
  process.exit();
}).catch(() => {
  console.error(chalk.red("An error occurred."));
  process.exit(1);
});
