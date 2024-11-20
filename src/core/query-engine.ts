import { Property } from "../types/Property";
import { calculateDistance } from "./distance-utils";

export type DataQuery = {
  field: string;
  operation: string;
  value: any;
};

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
