import { expect } from "chai";
import {
  validateQueryFormat,
  validateField,
  validateOperation,
  validateValue,
  validateQuery,
} from "../../core/validators";

describe("CORE | validators", () => {
  describe("validateQueryFormat", () => {
    it("should pass for valid query format", () => {
      expect(() => validateQueryFormat("price:greaterThan:300000")).to.not.throw();
    });

    it("should throw an error for invalid query format", () => {
      expect(() => validateQueryFormat("price-greaterThan-300000")).to.throw(
        "Invalid query format 'price-greaterThan-300000'. Expected format is field:operation:value."
      );
      expect(() => validateQueryFormat("price:greaterThan")).to.throw(
        "Invalid query format 'price:greaterThan'. Expected format is field:operation:value."
      );
    });
  });

  describe("validateField", () => {
    it("should pass for valid fields", () => {
      expect(() => validateField("price")).to.not.throw();
    });

    it("should throw an error for invalid fields", () => {
      expect(() => validateField("invalidField")).to.throw(
        "Invalid field 'invalidField'. Valid fields are: squareFootage, lighting, price, rooms, bathrooms, location, description, ammenities"
      );
    });
  });

  describe("validateOperation", () => {
    it("should pass for valid operations", () => {
      expect(() => validateOperation("greaterThan")).to.not.throw();
    });

    it("should throw an error for invalid operations", () => {
      expect(() => validateOperation("invalidOperation")).to.throw(
        "Invalid operation 'invalidOperation'. Valid operations are: equal, lessThan, greaterThan, match, distance, include"
      );
    });
  });

  describe("validateValue", () => {
    it("should validate numeric fields", () => {
      expect(() => validateValue("price", 300000)).to.not.throw();
      expect(() => validateValue("price", "notNumber")).to.throw(
        "Invalid value 'notNumber' for field 'price'. Expected a number."
      );
    });

    it("should validate 'lighting' field", () => {
      expect(() => validateValue("lighting", "high")).to.not.throw();
      expect(() => validateValue("lighting", "invalid")).to.throw(
        "Invalid value 'invalid' for field 'lighting'. Expected one of: low, medium, high."
      );
    });

    it("should validate 'location' field", () => {
      expect(() => validateValue("location", [40.7128, -74.0060])).to.not.throw();
      expect(() => validateValue("location", "invalidLocation")).to.throw(
        "Invalid value 'invalidLocation' for field 'location'. Expected an array with [latitude, longitude]."
      );
    });

    it("should validate 'ammenities' field", () => {
      expect(() => validateValue("ammenities", "pool")).to.not.throw();
      expect(() => validateValue("ammenities", 123)).to.throw(
        "Invalid value '123' for field 'ammenities'. Expected a string representing an amenity."
      );
    });

    it("should validate 'description' field", () => {
      expect(() =>
        validateValue("description", "A wonderful property near the city.")
      ).to.not.throw();
      expect(() => validateValue("description", "short")).to.throw(
        "Invalid description length for field 'description'. Must be between 10 and 500 characters."
      );
      expect(() => validateValue("description", "Lorem ipsum")).to.throw(
        "Invalid value for field 'description'. Contains prohibited words: Lorem ipsum, placeholder, test."
      );
    });
  });

  describe("validateQuery", () => {
    it("should validate a complete query object", () => {
      const query = { field: "price", operation: "greaterThan", value: 300000 };
      expect(() => validateQuery(query)).to.not.throw();
    });

    it("should throw errors for invalid query components", () => {
      expect(() => validateQuery({ field: "invalidField", operation: "greaterThan", value: 300000 })).to.throw(
        "Invalid field 'invalidField'. Valid fields are: squareFootage, lighting, price, rooms, bathrooms, location, description, ammenities"
      );
      expect(() => validateQuery({ field: "price", operation: "invalidOperation", value: 300000 })).to.throw(
        "Invalid operation 'invalidOperation'. Valid operations are: equal, lessThan, greaterThan, match, distance, include"
      );
      expect(() => validateQuery({ field: "price", operation: "greaterThan", value: "notNumber" })).to.throw(
        "Invalid value 'notNumber' for field 'price'. Expected a number."
      );
    });
  });
});
