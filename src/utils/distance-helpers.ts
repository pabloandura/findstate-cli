/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - The angle in degrees to convert.
 * @returns {number} - The angle in radians.
 *
 */
export const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Calculates the geospatial distance between two locations using the Haversine formula.
 *
 * @param {[number, number]} [latitude1, longitude1] - The coordinates of the first location.
 * @param {[number, number]} [latitude2, longitude2] - The coordinates of the second location.
 * @returns {number} - The distance between the two locations in kilometers.
 *
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

/**
 * Calculates the Levenshtein distance between two strings.
 * Used for fuzzy matching.
 * 
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} - The Levenshtein distance.
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else if (j === 0) {
        matrix[i][j] = i;
      } else if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          Math.min(
            matrix[i - 1][j],
            matrix[i][j - 1],
            matrix[i - 1][j - 1]
          ) + 1;
      }
    }
  }
  return matrix[a.length][b.length];
}

/**
 * Finds the closest match from a list of valid options using the Levenshtein distance.
 *
 * @param {string} input - The input string to match.
 * @param {string[]} validOptions - The list of valid options to compare against.
 * @returns {string} - The closest matching string from the valid options.
 *
 * @example
 * const closest = getClosestMatch("lighitng", ["lighting", "price", "rooms"]);
 * console.log(closest);
 */
export function getClosestMatch(input: string, validOptions: string[]): string {
  let closestMatch = "";
  let minDistance = Infinity;

  for (const option of validOptions) {
    const distance = levenshteinDistance(input, option);
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = option;
    }
  }

  return closestMatch;
}
