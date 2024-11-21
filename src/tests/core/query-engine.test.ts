import { expect } from "chai";
import { queryData } from "../../core/query-engine.js";
import { Property } from "../../types/Property.js";

describe("CORE | query-engine", () => {
  const mockProperties: Property[] = [
    {
      squareFootage: 1200,
      lighting: "high",
      price: 400000,
      rooms: 2,
      bathrooms: 1,
      location: [40.7128, -74.006],
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

  it("should filter properties by price greater than 400,000", () => {
    const queries = [
      { field: "price", operation: "greaterThan", value: 400000 },
    ];
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
    expect(() => queryData(mockProperties, queries)).to.throw(
      "Unsupported operation"
    );
  });
});

describe("CORE | Fuzzy matching", () => {
  const properties: Property[] = [
    {
      squareFootage: 1800,
      lighting: "high",
      price: 600000,
      rooms: 4,
      bathrooms: 3,
      location: [40.7128, -74.006],
      description: "Luxury house with a large garage and pool",
      ammenities: { pool: true, garage: true },
    },
    {
      squareFootage: 1200,
      lighting: "medium",
      price: 300000,
      rooms: 2,
      bathrooms: 1,
      location: [34.0522, -118.2437],
      description: "Compact city apartment",
      ammenities: { pool: false, garage: false },
    },
    {
      squareFootage: 1500,
      lighting: "medium",
      price: 500000,
      rooms: 3,
      bathrooms: 2,
      location: [37.7749, -122.4194],
      description: "Modern condo with a private garage and gym",
      ammenities: { pool: false, garage: true, gym: true },
    },
    {
      squareFootage: 2500,
      lighting: "low",
      price: 800000,
      rooms: 5,
      bathrooms: 4,
      location: [25.7617, -80.1918],
      description: "Spacious villa with a pool, garage, and garden",
      ammenities: { pool: true, garage: true, garden: true },
    },
    {
      squareFootage: 2000,
      lighting: "medium",
      price: 750000,
      rooms: 4,
      bathrooms: 3,
      location: [51.5074, -0.1278],
      description: "Elegant townhouse with garage and terrace",
      ammenities: { pool: false, garage: true, terrace: true },
    },
    {
      squareFootage: 900,
      lighting: "low",
      price: 200000,
      rooms: 1,
      bathrooms: 1,
      location: [48.8566, 2.3522],
      description: "Studio apartment in the city center",
      ammenities: { pool: false, garage: false },
    },
    {
      squareFootage: 2200,
      lighting: "high",
      price: 1000000,
      rooms: 6,
      bathrooms: 5,
      location: [41.8781, -87.6298],
      description: "Exclusive penthouse with pool, gym, and garage",
      ammenities: { pool: true, garage: true, gym: true },
    },
    {
      squareFootage: 1400,
      lighting: "medium",
      price: 400000,
      rooms: 3,
      bathrooms: 2,
      location: [35.6895, 139.6917],
      description: "Family home with garage and spacious backyard",
      ammenities: { pool: false, garage: true, backyard: true },
    },
    {
      squareFootage: 1000,
      lighting: "low",
      price: 250000,
      rooms: 2,
      bathrooms: 1,
      location: [52.52, 13.405],
      description: "Affordable apartment near downtown",
      ammenities: { pool: false, garage: false },
    },
    {
      squareFootage: 3000,
      lighting: "high",
      price: 1500000,
      rooms: 8,
      bathrooms: 6,
      location: [34.0522, -118.2437],
      description: "Luxury estate with a large pool, garage, and tennis court",
      ammenities: { pool: true, garage: true, tennisCourt: true },
    },
  ];

  it("should return properties with descriptions approximately matching the query", () => {
    const queries = [
      { field: "description", operation: "fuzzy", value: "garage" },
    ];
    const results = queryData(properties, queries);
  
   
    expect(results).to.have.lengthOf(7);
    expect(results.map((p) => p.description)).to.include.members([
      "Luxury house with a large garage and pool",
      "Modern condo with a private garage and gym",
      "Spacious villa with a pool, garage, and garden",
      "Elegant townhouse with garage and terrace",
    ]);
  });
  

  it("should return no properties if no approximate matches are found", () => {
    const queries = [
      { field: "description", operation: "fuzzy", value: "castle" },
    ];
    const results = queryData(properties, queries);
    expect(results).to.be.empty;
  });
});
