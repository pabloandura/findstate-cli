import { expect } from "chai";
import { loadData } from "../../core/data-loader.js";

import { mockData } from "../../data/mock-data.js";

describe("CORE | data-loader", () => {
  it("should return mock data when source is 'mock'", () => {
    const result = loadData("mock");
    expect(result).to.deep.equal(mockData);
  });

  it("should throw an error for unsupported sources", () => {
    expect(() => loadData("unsupportedSource")).to.throw(
      "Unsupported data source: unsupportedSource"
    );
  });
});
