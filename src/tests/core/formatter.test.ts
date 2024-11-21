import { expect } from "chai";
import { formatAsTable, formatAsJSON } from "../../core/formatter.ts";
import { Property } from "../../types/Property.ts";

describe("CORE | formatter", () => {
  const mockProperties: Property[] = [
    {
      squareFootage: 1200,
      lighting: "high",
      price: 400000,
      rooms: 2,
      bathrooms: 1,
      location: [40.7128, -74.0060],
      description: "Compact apartment",
      ammenities: { pool: true },
    },
    {
      squareFootage: 1500,
      lighting: "medium",
      price: 500000,
      rooms: 3,
      bathrooms: 2,
      location: [34.0522, -118.2437],
      description: "Spacious condo",
      ammenities: { pool: false },
    },
  ];

  describe("formatAsTable", () => {
    it("should return a formatted table for a list of properties", () => {
      const table = formatAsTable(mockProperties);
      expect(table).to.include("Square Footage");
      expect(table).to.include("Lighting");
      expect(table).to.include("1200");
      expect(table).to.include("high");
      expect(table).to.include("$400000");
      expect(table).to.include("Compact apartment");
    });

    it("should return 'No results found.' if the list of properties is empty", () => {
      const table = formatAsTable([]);
      expect(table).to.equal("No results found.");
    });
  });

  describe("formatAsJSON", () => {
    it("should return a formatted JSON string for a list of properties", () => {
      const json = formatAsJSON(mockProperties);
      const parsed = JSON.parse(json);
      expect(parsed).to.be.an("array").with.lengthOf(2);
      expect(parsed[0]).to.have.property("squareFootage", 1200);
      expect(parsed[1]).to.have.property("description", "Spacious condo");
    });

    it("should return an empty JSON array string if the list of properties is empty", () => {
      const json = formatAsJSON([]);
      expect(json).to.equal("[]");
    });
  });
});
