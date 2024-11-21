import inquirer from "inquirer";
import { queryCommand } from "./query";

const validFields = [
  "squareFootage",
  "lighting",
  "price",
  "rooms",
  "bathrooms",
  "location",
  "description",
  "ammenities",
];

const fieldHints: Record<string, string> = {
  lighting: "Valid values are 'low', 'medium', or 'high'.",
  squareFootage: "Enter a numeric value representing the area in square feet.",
  price: "Enter a numeric value representing the price.",
  rooms: "Enter a numeric value representing the number of rooms.",
  bathrooms: "Enter a numeric value representing the number of bathrooms.",
  location: "Enter coordinates in the format [latitude, longitude].",
  description: "Enter a text description (e.g., 'Cozy apartment').",
  ammenities: "Enter a specific amenity to search for (e.g., 'pool').",
};

const validOperations = ["equal", "lessThan", "greaterThan", "match", "distance", "include"];

export async function interactiveMode(source: string = "mock", output: string = "table"): Promise<void> {
  const queries: string[] = [];
  let addMore = true;

  while (addMore) {
    const { field }: { field: string } = await inquirer.prompt([
      {
        type: "list",
        name: "field",
        message: "Select field to query:",
        choices: validFields,
      },
    ]);

    const fieldHint = fieldHints[field] || "Enter a valid value.";

    const { operation }: { operation: string } = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        message: "Select operation:",
        choices: validOperations,
      },
    ]);

    const { value }: { value: string } = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter value for ${field} using the operation "${operation}":\n${fieldHint}`,
      },
    ]);

    queries.push(`${field}:${operation}:${value}`);

    const { continueAdding }: { continueAdding: boolean } = await inquirer.prompt({
      type: "confirm",
      name: "continueAdding",
      message: "Do you want to add another query?",
    });

    addMore = continueAdding;
  }

  queryCommand(queries, source, output);
}
