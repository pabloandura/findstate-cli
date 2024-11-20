import Table from "cli-table3";
import { Property } from "../types/Property";

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

export function formatAsJSON(properties: Property[]): string {
  return JSON.stringify(properties, null, 2);
}
