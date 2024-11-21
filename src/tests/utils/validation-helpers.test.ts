import path from "path";
import { fileURLToPath } from "url";
import { expect } from "chai";
import fs from "fs";
import sinon from "sinon";
import {
  validateRequiredArray,
  validateOptionValues,
  validateFileName,
} from "../../utils/validation-helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("UTILS | Validation Helpers", () => {
  describe("validateRequiredArray", () => {
    it("should not throw an error for a non-empty array", () => {
      expect(() =>
        validateRequiredArray([1, 2, 3], "Array is required")
      ).to.not.throw();
    });

    it("should throw an error for an empty array", () => {
      expect(() => validateRequiredArray([], "Array is required")).to.throw(
        "Array is required"
      );
    });

    it("should throw an error for a non-array input", () => {
      expect(() =>
        validateRequiredArray("not-an-array", "Array is required")
      ).to.throw("Array is required");
    });
  });

  describe("validateOptionValues", () => {
    const validValues = ["mock", "real"];

    it("should not throw an error for a valid option", () => {
      expect(() =>
        validateOptionValues("mock", validValues, "Invalid option")
      ).to.not.throw();
    });

    it("should throw an error for an invalid option with a suggestion", () => {
      expect(() =>
        validateOptionValues("mok", validValues, "Invalid option")
      ).to.throw(
        "Invalid option Did you mean 'mock'? Allowed values: mock, real."
      );
    });
  });

  describe("validateFileName", () => {
    const mockDir = path.join(__dirname, "mock-dir");
    const validFileName = path.join(mockDir, "output.json");
    const invalidFileName = path.join(mockDir, "output.txt");

    beforeEach(() => {
      sinon.stub(fs, "existsSync").callsFake((dir) => dir === mockDir);
      sinon.stub(fs, "accessSync").callsFake((dir) => {
        if (dir !== mockDir) throw new Error("Directory not writable");
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should not throw an error for a valid JSON file name in an existing writable directory", () => {
      expect(() => validateFileName(validFileName)).to.not.throw();
    });

    it("should throw an error for a file name without a .json extension", () => {
      expect(() => validateFileName(invalidFileName)).to.throw(
        "The output file must have a .json extension."
      );
    });

    it("should throw an error for a file in a non-existent directory", () => {
      sinon.restore();
      sinon.stub(fs, "existsSync").returns(false);
      expect(() => validateFileName(validFileName)).to.throw(
        `Directory '${mockDir}' does not exist.`
      );
    });

    it("should throw an error for a file in a non-writable directory", () => {
      sinon.restore();
      sinon.stub(fs, "existsSync").returns(true);
      sinon.stub(fs, "accessSync").throws(new Error("Directory not writable"));

      expect(() => validateFileName(validFileName)).to.throw(
        `Directory '${mockDir}' is not writable.`
      );
    });
  });
});
