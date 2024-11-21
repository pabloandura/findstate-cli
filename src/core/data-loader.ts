import { mockData } from "../data/mock-data.js";
import { Property } from "../types/Property.js";

/**
 * Loads mock property data or throws an error for unsupported sources.
 *
 * @param {string} source - The source of the data ("mock" for preloaded data).
 * @returns {Property[]} - The list of properties.
 *
 * @throws {Error} If the specified source is not supported.
 *
 * @example
 * const properties = loadData("mock");
 * console.log(properties);
 */
export function loadData(source: string): Property[] {
  if (source === "mock") {
    return mockData;
  }

  throw new Error(`Unsupported data source: ${source}`);
}
