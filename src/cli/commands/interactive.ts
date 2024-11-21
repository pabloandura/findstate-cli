import inquirer from "inquirer";
import { queryCommand } from "./query";

export async function interactiveMode(source: string = "mock", output: string = "table"): Promise<void> {
  const queries: string[] = [];
  let addMore = true;

  while (addMore) {
    const { field, operation, value } = await inquirer.prompt([
      { type: "input", name: "field", message: "Enter field to query (e.g., price, rooms):" },
      { 
        type: "list", 
        name: "operation", 
        message: "Select operation:", 
        choices: ["equal", "lessThan", "greaterThan", "match", "distance", "include"] 
      },
      { type: "input", name: "value", message: "Enter value for the operation:" },
    ]);

    queries.push(`${field}:${operation}:${value}`);

    const { continueAdding } = await inquirer.prompt({
      type: "confirm",
      name: "continueAdding",
      message: "Do you want to add another query?",
    });

    addMore = continueAdding;
  }

  queryCommand(queries, source, output);
}
