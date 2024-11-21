import { Property } from "../types/Property.ts";
import { calculateDistance, levenshteinDistance } from "./distance-utils.ts";

/**
 * Represents a query used to filter properties.
 * @typedef {Object} DataQuery
 * @property {string} field - The property field to query (e.g., "price", "rooms").
 * @property {string} operation - The operation to perform (e.g., "equal", "lessThan", "greaterThan").
 * @property {any} value - The value to compare against, type depends on the field.
 */
export type DataQuery = {
  field: string;
  operation: string;
  value: any;
};

/**
 * Filters a list of properties based on the specified queries.
 * 
 * Supported operations:
 * - `equal`: Checks if the field is equal to the value.
 * - `lessThan`: Checks if the field is less than the value (numeric fields only).
 * - `greaterThan`: Checks if the field is greater than the value (numeric fields only).
 * - `match`: Checks if the field includes a substring (string fields only).
 * - `fuzzy`: Checks if the field is approximately similar to the value (string fields only).
 * - `distance`: Checks if a location field is within a certain radius of a target location.
 * - `include`: Checks if a field includes a specific boolean property (e.g., an amenity like `yard` or `garage`).
 * 
 * @param {Property[]} properties - The list of properties to filter.
 * @param {DataQuery[]} queries - The list of queries to apply to the properties.
 * @returns {Property[]} - A filtered list of properties that match all queries.
 * 
 * @throws {Error} If an unsupported operation is encountered.
 */
export function queryData(properties: Property[], queries: DataQuery[]): Property[] {
  return properties.filter((property) => {
    return queries.every((query) => {
      const fieldValue = property[query.field as keyof Property];
      switch (query.operation) {
        case "equal":
          return fieldValue === query.value;
        case "lessThan":
          return typeof fieldValue === "number" && fieldValue < query.value;
        case "greaterThan":
          return typeof fieldValue === "number" && fieldValue > query.value;
        case "match":
          return typeof fieldValue === "string" && fieldValue.includes(query.value);
        case "fuzzy":
          if (typeof fieldValue === "string" && typeof query.value === "string") {
            const words = fieldValue.toLowerCase().split(/\s+/);
            const queryValue = query.value.toLowerCase();
        
            return words.some((word) => {
              const distance = levenshteinDistance(word, queryValue);
              return distance <= 3;
            });
          }
          return false;
          
        case "distance":
          if (Array.isArray(query.value) && query.value.length === 3) {
            const [targetLat, targetLon, radius] = query.value;
            if (Array.isArray(fieldValue) && fieldValue.length === 2) {
              const distance = calculateDistance(fieldValue as [number, number], [targetLat, targetLon]);
              return distance <= radius;
            }
          }
          return false;
        case "include":
          return (
            typeof fieldValue === "object" &&
            fieldValue[query.value as keyof typeof fieldValue] === true
          );
        default:
          throw new Error(`Unsupported operation: ${query.operation}`);
      }
    });
  });
}
