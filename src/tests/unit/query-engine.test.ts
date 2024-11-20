import { expect } from "chai";
import { queryData } from "../../core/query-engine.ts";
import { Property } from "../../types/Property.ts";

describe("queryData", () => {
  const mockProperties: Property[] = [
    { squareFootage: 1200, lighting: "high", price: 400000, rooms: 2, bathrooms: 1, location: [40.7128, -74.0060], description: "Compact apartment", ammenities: { pool: true } },
    { squareFootage: 1500, lighting: "medium", price: 500000, rooms: 3, bathrooms: 2, location: [34.0522, -118.2437], description: "Spacious condo", ammenities: { pool: false } },
  ];

  it("should filter properties by price greater than 400,000", () => {
    const queries = [{ field: "price", operation: "greaterThan", value: 400000 }];
    const results = queryData(mockProperties, queries);
    expect(results).to.have.lengthOf(1);
    expect(results[0].price).to.equal(500000);
  });

  it("should return an empty array if no properties match", () => {
    const queries = [{ field: "rooms", operation: "greaterThan", value: 10 }];
    const results = queryData(mockProperties, queries);
    expect(results).to.be.empty;
  });

  it("should throw an error for unsupported operations", () => {
    const queries = [{ field: "price", operation: "unsupported", value: 100 }];
    expect(() => queryData(mockProperties, queries)).to.throw("Unsupported operation");
  });
});
