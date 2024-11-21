import path from "path";
import fs from "fs";

export function validateRequiredArray(array: any[], errorMessage: string): void {
    if (!Array.isArray(array) || array.length === 0) {
      console.error(`Error: ${errorMessage}`);
      process.exit(1);
    }
  }
  
  export function validateOptionValues(option: string, validValues: string[], errorMessage: string): void {
    if (!validValues.includes(option)) {
      console.error(`Error: ${errorMessage} Allowed values: ${validValues.join(", ")}.`);
      process.exit(1);
    }
  }
  
  export function validateFileName(fileName: string): void {
    if (!fileName.endsWith(".json")) {
      throw new Error("Error: The output file must have a .json extension.");
    }
  
    const dirName = path.dirname(fileName);
    if (!fs.existsSync(dirName)) {
      throw new Error(`Error: Directory '${dirName}' does not exist.`);
    }
  
    try {
      fs.accessSync(dirName, fs.constants.W_OK);
    } catch {
      throw new Error(`Error: Directory '${dirName}' is not writable.`);
    }
  }