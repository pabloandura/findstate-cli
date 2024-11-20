import { queryData } from "../../core/query-engine";
import { loadData } from "../../core/data-loader";
import { formatAsTable, formatAsJSON } from "../../core/formatter";
import { validateQuery } from "../../core/validators";

export function queryCommand(queries: string[], source: string = "mock", output: string = "table"): void {
  const data = loadData(source);

  const parsedQueries = queries.map((query) => {
    const [field, operation, value] = query.split(":");
    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    const queryObject = { field, operation, value: parsedValue };

    validateQuery(queryObject);
    return queryObject;
  });

  const results = queryData(data, parsedQueries);

  if (output === "json") {
    console.log(formatAsJSON(results));
  } else {
    console.log(formatAsTable(results));
  }
}
