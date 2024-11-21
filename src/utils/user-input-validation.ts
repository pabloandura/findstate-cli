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
  