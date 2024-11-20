/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - The angle in degrees to convert.
 * @returns {number} - The angle in radians.
 *
 * @example
 * const radians = degreesToRadians(180);
 * console.log(radians); // Outputs: 3.141592653589793
 */
export const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Calculates the geospatial distance between two locations using the Haversine formula.
 *
 * @param {[number, number]} [latitude1, longitude1] - The coordinates of the first location.
 * @param {[number, number]} [latitude2, longitude2] - The coordinates of the second location.
 * @returns {number} - The distance between the two locations in kilometers.
 *
 * @example
 * const distance = calculateDistance([40.7128, -74.0060], [34.0522, -118.2437]);
 * console.log(distance); // Outputs: 3940.737 km
 */
export function calculateDistance(
  [latitude1, longitude1]: [number, number],
  [latitude2, longitude2]: [number, number]
): number {
  const earthRadiusKm = 6371;

  const latitudeDifference = degreesToRadians(latitude2 - latitude1);
  const longitudeDifference = degreesToRadians(longitude2 - longitude1);

  const radianLatitude1 = degreesToRadians(latitude1);
  const radianLatitude2 = degreesToRadians(latitude2);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(radianLatitude1) *
      Math.cos(radianLatitude2) *
      Math.sin(longitudeDifference / 2) ** 2;

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * centralAngle;
}
