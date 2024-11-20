import { Property } from '../types/Property';

export function loadData(source: string): Property[] {
  if (source === "mock") {
    return [
      {
        squareFootage: 2000,
        lighting: "medium",
        price: 300000,
        rooms: 4,
        bathrooms: 2,
        location: [40.7128, -74.0060],
        description: "Beautiful family home in a quiet neighborhood.",
        ammenities: { yard: true, garage: true, pool: false },
      },
      {
        squareFootage: 1500,
        lighting: "high",
        price: 250000,
        rooms: 3,
        bathrooms: 2,
        location: [34.0522, -118.2437],
        description: "Modern apartment in the heart of the city.",
        ammenities: { yard: false, garage: true, pool: true },
      },
    ];
  }

  throw new Error(`Unsupported data source: ${source}`);
}
