import { expect } from "chai";
import { degreesToRadians, calculateDistance } from "../../core/distance-utils.ts";

describe("CORE | distance-utils", () => {
  describe("degreesToRadians", () => {
    it("should convert 0 degrees to 0 radians", () => {
      const radians = degreesToRadians(0);
      expect(radians).to.equal(0);
    });

    it("should convert 180 degrees to π radians", () => {
      const radians = degreesToRadians(180);
      expect(radians).to.be.closeTo(Math.PI, 0.000001);
    });

    it("should convert -90 degrees to -π/2 radians", () => {
      const radians = degreesToRadians(-90);
      expect(radians).to.be.closeTo(-Math.PI / 2, 0.000001);
    });

    it("should handle floating-point degrees", () => {
      const radians = degreesToRadians(45.5);
      expect(radians).to.be.closeTo((45.5 * Math.PI) / 180, 0.000001);
    });
  });

  describe("calculateDistance", () => {
    it("should calculate zero distance for identical coordinates", () => {
      const distance = calculateDistance([0, 0], [0, 0]);
      expect(distance).to.equal(0);
    });

    it("should calculate the distance between New York and Los Angeles", () => {
      const distance = calculateDistance([40.7128, -74.0060], [34.0522, -118.2437]);
      expect(distance).to.be.closeTo(3935.737, 0.1); // Approximate real-world value
    });

    it("should calculate the distance between the North Pole and the Equator", () => {
      const distance = calculateDistance([90, 0], [0, 0]);
      expect(distance).to.be.closeTo(10007.543, 0.1); // Earth's quarter circumference
    });

    it("should calculate the distance for points on the same latitude", () => {
      const distance = calculateDistance([0, 0], [0, 90]);
      expect(distance).to.be.closeTo(10007.54, 0.1); // One-fourth of Earth's circumference
    });

    it("should calculate the distance for points on the same longitude", () => {
      const distance = calculateDistance([0, 0], [45, 0]);
      expect(distance).to.be.closeTo(5003.771, 0.1); // Approximate value
    });

    it("should handle negative coordinates (e.g., southern and western hemispheres)", () => {
      const distance = calculateDistance([-34.6037, -58.3816], [-33.8688, 151.2093]); // Buenos Aires to Sydney
      expect(distance).to.be.closeTo(11801, 1); // Approximate real-world value
    });
  });
});
