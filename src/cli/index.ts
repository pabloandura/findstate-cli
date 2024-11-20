#!/usr/bin/env node
import { Command } from "commander";
import { queryCommand } from "./commands/query.ts";
import { interactiveMode } from "./commands/interactive.ts";
import { helpCommand } from "./commands/help.ts";
import { exportCommand } from "./commands/export.ts";

const program = new Command();

program
  .name("findstate-cli")
  .description("A CLI for querying data optimized for Real Estate")
  .version("1.0.0");

program
  .command("query")
  .description("Run a query using filters")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source (mock or real)")
  .option("-o, --output <output>", "Output format (table or json)")
  .action(({ queries, source, output }: { queries: string[]; source: string; output: string }) =>
    queryCommand(queries, source, output)
  );

program
  .command("interactive")
  .description("Start interactive mode to build queries step by step")
  .option("-s, --source <source>", "Data source (mock or real)", "mock")
  .option("-o, --output <output>", "Output format (table or json)", "table")
  .action(({ source, output }: { source: string; output: string }) => interactiveMode(source, output));

program
  .command("help")
  .description("Display detailed usage information")
  .action(() => helpCommand());

program
  .command("export")
  .description("Export query results to a file")
  .option("-q, --queries <queries...>", "Query filters in the format field:operation:value")
  .option("-s, --source <source>", "Data source (mock or real)", "mock")
  .option("-f, --file <file>", "Output file name", "results.json")
  .action(({ queries, source, file }: { queries: string[]; source: string; file: string }) =>
    exportCommand(queries, source, file)
  );

program.on("command:*", (operands: string[]) => {
  console.error(`\nError: Invalid command '${operands[0]}'.`);
  console.log("See 'findstate-cli --help' for a list of available commands.\n");
  process.exit(1);
});

program.parse(process.argv);
