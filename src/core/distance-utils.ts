export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

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
  