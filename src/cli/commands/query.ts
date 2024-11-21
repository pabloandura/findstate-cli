import { loadData } from "../../core/data-loader.ts";
import { formatAsJSON, formatAsTable } from "../../core/formatter.ts";
import { queryData } from "../../core/query-engine.ts";
import { validateQuery } from "../../core/validators.ts";

export function queryCommand(queries: string[], source: string = "mock", output: string = "table"): void {
    const data = loadData(source);
  
    if (!queries || queries.length === 0) {
      console.error("Error: No queries provided. Use the format field:operation:value.");
      console.info("Example: price:greaterThan:300000 or rooms:lessThan:5");
      process.exit(1);
    }
  
    const parsedQueries = queries.map((query) => {
      const parts = query.split(":");
      if (parts.length !== 3) {
        console.error(`Error: Invalid query format '${query}'. Expected format is field:operation:value.`);
        console.info("Example: price:greaterThan:300000 or rooms:lessThan:5");
        process.exit(1);
      }
  
      const [field, operation, value] = parts;
      const parsedValue = isNaN(Number(value)) ? value : Number(value);
      const queryObject = { field, operation, value: parsedValue };
  
      validateQuery(queryObject);
      return queryObject;
    });
  
    const results = queryData(data, parsedQueries);
  
    if (output === "json") {
      console.info(formatAsJSON(results));
    } else {
      console.info(formatAsTable(results));
    }
  }
  