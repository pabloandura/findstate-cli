import fs from "fs";
import { queryData } from "../../core/query-engine";
import { loadData } from "../../core/data-loader";

export function exportCommand(
  queries: string[],
  source: string = "mock",
  fileName: string = "results.json"
): void {
  const data = loadData(source);

  const parsedQueries = queries.map((query) => {
    const [field, operation, value] = query.split(":");
    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    return { field, operation, value: parsedValue };
  });

  const results = queryData(data, parsedQueries);

  fs.writeFileSync(fileName, JSON.stringify(results, null, 2));
  console.log(`Results exported to ${fileName}`);
}
