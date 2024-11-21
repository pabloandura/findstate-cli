import path from "path";
import fs from "fs";
import { getClosestMatch } from "./distance-helpers.js";

export function validateRequiredArray(array: unknown, errorMessage: string): void {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error(errorMessage);
  }
}

export function validateOptionValues(
  option: string,
  validValues: string[],
  errorMessage: string
): void {
  if (!validValues.includes(option)) {
    const closestMatch = getClosestMatch(option, validValues);
    throw new Error(
      `${errorMessage} Did you mean '${closestMatch}'? Allowed values: ${validValues.join(", ")}.`
    );
  }
}


export function validateFileName(fileName: string): void {
  if (!fileName.endsWith(".json")) {
    throw new Error("The output file must have a .json extension.");
  }

  const dirName = path.dirname(fileName);
  if (!fs.existsSync(dirName)) {
    throw new Error(`Directory '${dirName}' does not exist.`);
  }

  try {
    fs.accessSync(dirName, fs.constants.W_OK);
  } catch {
    throw new Error(`Directory '${dirName}' is not writable.`);
  }
}
