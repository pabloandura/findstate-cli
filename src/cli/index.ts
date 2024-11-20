#!/usr/bin/env node
import { Command } from "commander";
import { queryCommand } from "./commands/query";
import { interactiveMode } from "./commands/interactive";
import { helpCommand } from "./commands/help";
import { exportCommand } from "./commands/export";

const program = new Command();

program
  .name("findstate-cli")
  .description("A CLI for querying data optimized for Real Estate")
  .version("1.0.0");

program
  .command("query")
  .description("Run a query using filters")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source (mock or real)", "mock")
  .option("-o, --output <output>", "Output format (table or json)", "table")
  .action(({ queries, source, output }) => queryCommand(queries, source, output));

program
  .command("interactive")
  .description("Start interactive mode to build queries step by step")
  .option("-s, --source <source>", "Data source (mock or real)", "mock")
  .option("-o, --output <output>", "Output format (table or json)", "table")
  .action(({ source, output }) => interactiveMode(source, output));

program
  .command("help")
  .description("Display detailed usage information")
  .action(helpCommand);

program
  .command("export")
  .description("Export query results to a file")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source (mock or real)", "mock")
  .option("-f, --file <file>", "Output file name", "results.json")
  .action(({ queries, source, file }) => exportCommand(queries, source, file));

program.on("command:*", (operands) => {
  console.error(`\nError: Invalid command '${operands[0]}'.`);
  console.log("See 'findstate-cli --help' for a list of available commands.\n");
  process.exit(1);
});

program.parse(process.argv);