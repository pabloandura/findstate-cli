import { Property } from "../types/Property";

export function loadData(source: string): Property[] {
  if (source === "mock") {
    return [
      {
        squareFootage: 1200,
        lighting: "high",
        price: 400000,
        rooms: 2,
        bathrooms: 1,
        location: [40.7128, -74.0060],
        description: "Compact apartment with modern amenities in the heart of the city.",
        ammenities: { yard: false, garage: false, pool: true, gym: true },
      },
      {
        squareFootage: 1500,
        lighting: "medium",
        price: 500000,
        rooms: 3,
        bathrooms: 2,
        location: [34.0522, -118.2437],
        description: "Spacious condo with a great view of the city skyline.",
        ammenities: { yard: false, garage: true, pool: true, rooftop: true },
      },

      {
        squareFootage: 2500,
        lighting: "medium",
        price: 350000,
        rooms: 4,
        bathrooms: 3,
        location: [41.8781, -87.6298],
        description: "Family home with a large backyard in a quiet suburb.",
        ammenities: { yard: true, garage: true, pool: false, fireplace: true },
      },
      {
        squareFootage: 3000,
        lighting: "low",
        price: 275000,
        rooms: 5,
        bathrooms: 4,
        location: [29.7604, -95.3698],
        description: "Affordable house with extra rooms and a two-car garage.",
        ammenities: { yard: true, garage: true, pool: false, basement: true },
      },

      {
        squareFootage: 4000,
        lighting: "high",
        price: 2000000,
        rooms: 6,
        bathrooms: 5,
        location: [25.7617, -80.1918],
        description: "Luxury villa with a private pool and beach access.",
        ammenities: { yard: true, garage: true, pool: true, gym: true, sauna: true },
      },
      {
        squareFootage: 5000,
        lighting: "high",
        price: 3000000,
        rooms: 7,
        bathrooms: 6,
        location: [37.7749, -122.4194],
        description: "Exclusive mansion with stunning views of the Golden Gate Bridge.",
        ammenities: { yard: true, garage: true, pool: true, homeTheater: true, wineCellar: true },
      },

      {
        squareFootage: 2000,
        lighting: "low",
        price: 180000,
        rooms: 3,
        bathrooms: 2,
        location: [36.7783, -119.4179],
        description: "Cozy farmhouse with acres of open land and a small barn.",
        ammenities: { yard: true, garage: false, pool: false, fireplace: true, barn: true },
      },
      {
        squareFootage: 2200,
        lighting: "medium",
        price: 220000,
        rooms: 4,
        bathrooms: 3,
        location: [39.7392, -104.9903],
        description: "Ranch-style house with mountain views and fresh air.",
        ammenities: { yard: true, garage: true, pool: false, fireplace: true, stable: true },
      },

      {
        squareFootage: 1400,
        lighting: "medium",
        price: 150000,
        rooms: 3,
        bathrooms: 2,
        location: [32.7767, -96.7970],
        description: "Starter home perfect for first-time buyers.",
        ammenities: { yard: true, garage: false, pool: false, fireplace: false },
      },
      {
        squareFootage: 1300,
        lighting: "low",
        price: 140000,
        rooms: 2,
        bathrooms: 1,
        location: [40.4406, -79.9959],
        description: "Charming older home with potential for renovation.",
        ammenities: { yard: true, garage: false, pool: false, attic: true },
      },
    ];
  }

  throw new Error(`Unsupported data source: ${source}`);
}
