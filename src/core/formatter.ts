import Table from "cli-table3";
import { Property } from "../types/Property";

/**
 * Formats a list of properties into a table for CLI display.
 *
 * @param {Property[]} properties - The list of properties to format.
 * @returns {string} - The formatted table as a string.
 *
 * @example
 * const properties = [{ squareFootage: 1200, lighting: "high", ... }];
 * console.log(formatAsTable(properties));
 */
export function formatAsTable(properties: Property[]): string {
  if (properties.length === 0) return "No results found.";

  const table = new Table({
    head: ["Square Footage", "Lighting", "Price", "Rooms", "Bathrooms", "Location", "Description"],
  });

  properties.forEach((property) => {
    table.push([
      property.squareFootage,
      property.lighting,
      `$${property.price}`,
      property.rooms,
      property.bathrooms,
      property.location.join(", "),
      property.description,
    ]);
  });

  return table.toString();
}

/**
 * Formats a list of properties as a JSON string.
 *
 * @param {Property[]} properties - The list of properties to format.
 * @returns {string} - The formatted JSON string.
 *
 * @example
 * const properties = [{ squareFootage: 1200, lighting: "high", ... }];
 * console.log(formatAsJSON(properties));
 */
export function formatAsJSON(properties: Property[]): string {
  return JSON.stringify(properties, null, 2);
}
