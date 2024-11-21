#!/usr/bin/env node

import { Command } from "commander";
import { queryCommand } from "./commands/query.ts";
import { interactiveMode } from "./commands/interactive.ts";
import { helpCommand } from "./commands/help.ts";
import { exportCommand } from "./commands/export.ts";
import { validateRequiredArray, validateOptionValues, validateFileName } from "../utils/validation-helpers.ts";
import { handleError } from "../utils/handleError.ts";

const program = new Command();

program
  .name("findstate-cli")
  .description("A CLI for querying data optimized for Real Estate")
  .version("1.0.0");

program
  .command("query")
  .description("Run a query using filters")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source (default: mock)", "mock")
  .option("-o, --output <output>", "Output format (table or json, default: table)", "table")
  .action((options) => {
    try {
      validateRequiredArray(options.queries, "--queries is required for the query command.");
      validateOptionValues(options.source, ["mock"], "Invalid data source.");
      validateOptionValues(options.output, ["table", "json"], "Invalid output format.");
      queryCommand(options.queries, options.source, options.output);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("interactive")
  .description("Start interactive mode to build queries step by step")
  .option("-s, --source <source>", "Data source (default: mock)", "mock")
  .option("-o, --output <output>", "Output format (table or json, default: table)", "table")
  .action((options) => {
    try {
      validateOptionValues(options.source, ["mock"], "Invalid data source.");
      validateOptionValues(options.output, ["table", "json"], "Invalid output format.");
      interactiveMode(options.source, options.output);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("help")
  .description("Display detailed usage information")
  .action(helpCommand);

program
  .command("export")
  .description("Export query results to a file")
  .option("-q, --query <queries...>", "Queries to filter data")
  .option("-s, --source <source>", "Data source (default: mock)", "mock")
  .option("-f, --fileName <fileName>", "Output file name (default: results.json)", "results.json")
  .action((options) => {
    try {
      validateRequiredArray(options.query, "--query is required for the export command.");
      validateFileName(options.fileName);
      validateOptionValues(options.source, ["mock"], "Invalid data source.");
      exportCommand(options.query, options.source, options.fileName);
    } catch (error) {
      handleError(error);
    }
  });

program.on("command:*", (operands: string[]) => {
  console.error(`\nError: Invalid command '${operands[0]}'.`);
  console.info("See 'findstate-cli --help' for a list of available commands.\n");
  process.exit(1);
});

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

try {
  program.parse(process.argv);
} catch (error) {
  handleError(error);
}