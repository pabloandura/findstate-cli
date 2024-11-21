#!/usr/bin/env node
import { Command } from "commander";
import { queryCommand } from "./commands/query";
import { interactiveMode } from "./commands/interactive";
import { helpCommand } from "./commands/help";
import { exportCommand } from "./commands/export";
import { validateRequiredArray, validateOptionValues } from '../utils/user-input-validation';

const program = new Command();

program
  .name("findstate-cli")
  .description("A CLI for querying data optimized for Real Estate")
  .version("1.0.0");

program
  .command("query")
  .description("Run a query using filters")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source", "mock")
  .option("-o, --output <output>", "Output format (table or json)", "table")
  .action((options) => {
    validateRequiredArray(options.queries, "--queries is required for the query command.");
    validateOptionValues(options.source, ["mock"], "Invalid data source.");
    validateOptionValues(options.output, ["table", "json"], "Invalid output format.");
    queryCommand(options.queries, options.source, options.output);
  });

program
  .command("interactive")
  .description("Start interactive mode to build queries step by step")
  .option("-s, --source <source>", "Data source", "mock")
  .option("-o, --output <output>", "Output format (table or json)", "table")
  .action((options) => {
    validateOptionValues(options.source, ["mock"], "Invalid data source.");
    validateOptionValues(options.output, ["table", "json"], "Invalid output format.");
    interactiveMode(options.source, options.output);
  });

program
  .command("help")
  .description("Display detailed usage information")
  .action(helpCommand);

program
  .command("export")
  .description("Export query results to a file")
  .option("-q, --query <queries...>", "Queries to filter data")
  .option("-s, --source <source>", "Data source", "mock")
  .option("-f, --fileName <fileName>", "Output file name", "results.json")
  .action((options) => {
    validateRequiredArray(options.query, "--query is required for the export command.");
    if (!options.fileName.endsWith(".json")) {
      console.error("Error: The output file must have a .json extension.");
      process.exit(1);
    }
    validateOptionValues(options.source, ["mock"], "Invalid data source.");
    exportCommand(options.query, options.source, options.fileName);
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
  console.error("An unexpected error occurred:");
  console.error(error);
  process.exit(1);
}
