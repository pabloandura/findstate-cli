import fs from "fs";
import { queryData } from "../../core/query-engine";
import { loadData } from "../../core/data-loader";
import { validateFileName } from "../../utils/user-input-validation";

export function exportCommand(
  queries: string[],
  source: string = "mock",
  fileName: string = "results.json"
): void {
  try {
    validateFileName(fileName);
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }

  const data = loadData(source);

  const parsedQueries = queries.map((query) => {
    const [field, operation, value] = query.split(":");
    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    return { field, operation, value: parsedValue };
  });

  const results = queryData(data, parsedQueries);

  try {
    fs.writeFileSync(fileName, JSON.stringify(results, null, 2));
    console.info(`Results exported to ${fileName}`);
  } catch (error) {
    console.error("Error: Unable to write to the specified file.");
    console.error((error as Error).message);
    process.exit(1);
  }
}
