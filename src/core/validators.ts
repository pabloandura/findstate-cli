import { DataQuery } from "./query-engine";

export function validateQuery(query: DataQuery): void {
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
  
    const validOperations = ["equal", "lessThan", "greaterThan", "match", "distance", "include"];
  
    if (!validFields.includes(query.field)) {
      throw new Error(`Invalid field: ${query.field}. Valid fields are: ${validFields.join(", ")}`);
    }
  
    if (!validOperations.includes(query.operation)) {
      throw new Error(
        `Invalid operation: ${query.operation}. Valid operations are: ${validOperations.join(", ")}`
      );
    }
  
    if (query.operation === "distance" && !Array.isArray(query.value)) {
      throw new Error(`Distance queries require an array value with [lat, lon, radius].`);
    }
  }
  