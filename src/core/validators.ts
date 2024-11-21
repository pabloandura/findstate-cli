const validFields = [
  "squareFootage",
  "lighting",
  "price",
  "rooms",
  "bathrooms",
  "location",
  "description",
  "ammenities",
];

const validOperations = [
  "equal",
  "lessThan",
  "greaterThan",
  "match",
  "distance",
  "include",
];

/**
 * Validates a query string format.
 * @param query - The query string to validate.
 */
export function validateQueryFormat(query: string): void {
  const parts = query.split(":");
  if (parts.length !== 3) {
    throw new Error(
      `Invalid query format '${query}'. Expected format is field:operation:value.`
    );
  }
}

/**
 * Validates the query field.
 * @param field - The field to validate.
 */
export function validateField(field: string): void {
  if (!validFields.includes(field)) {
    throw new Error(
      `Invalid field '${field}'. Valid fields are: ${validFields.join(", ")}`
    );
  }
}

/**
 * Validates the query operation.
 * @param operation - The operation to validate.
 */
export function validateOperation(operation: string): void {
  if (!validOperations.includes(operation)) {
    throw new Error(
      `Invalid operation '${operation}'. Valid operations are: ${validOperations.join(
        ", "
      )}`
    );
  }
}

/**
 * Validates the query value based on the field.
 * @param field - The field the value belongs to.
 * @param value - The value to validate.
 * @param operation - The operation to consider for validation.
 */
export function validateValue(
  field: string,
  value: any,
  operation: string = "equal"
): void {
  switch (field) {
    case "squareFootage":
    case "price":
    case "rooms":
    case "bathrooms":
      if (isNaN(Number(value))) {
        throw new Error(
          `Invalid value '${value}' for field '${field}'. Expected a number.`
        );
      }
      break;

    case "lighting":
      if (!["low", "medium", "high"].includes(value)) {
        throw new Error(
          `Invalid value '${value}' for field '${field}'. Expected one of: low, medium, high.`
        );
      }
      break;

    case "location":
      if (!Array.isArray(value) || value.length !== 2) {
        throw new Error(
          `Invalid value '${value}' for field '${field}'. Expected an array with [latitude, longitude].`
        );
      }
      break;

    case "ammenities":
      if (typeof value !== "string") {
        throw new Error(
          `Invalid value '${value}' for field '${field}'. Expected a string representing an amenity.`
        );
      }
      break;

    case "description":
      if (operation === "match") {
        if (typeof value !== "string" || value.length === 0) {
          throw new Error(
            `Invalid value for field '${field}'. Must be a non-empty string for match.`
          );
        }
      } else {
        if (typeof value !== "string" || value.length < 10 || value.length > 500) {
          throw new Error(
            `Invalid description length for field '${field}'. Must be between 10 and 500 characters.`
          );
        }
        const prohibitedWords = ["Lorem ipsum", "placeholder", "test"];
        if (prohibitedWords.some((word) => value.includes(word))) {
          throw new Error(
            `Invalid value for field '${field}'. Contains prohibited words: ${prohibitedWords.join(
              ", "
            )}.`
          );
        }
      }
      break;

    default:
      break;
  }
}

/**
 * Validates an entire query object.
 * @param query - The query object to validate.
 */
export function validateQuery(query: {
  field: string;
  operation: string;
  value: any;
}): void {
  validateField(query.field);
  validateOperation(query.operation);
  validateValue(query.field, query.value, query.operation);
}
