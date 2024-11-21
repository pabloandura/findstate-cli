# findstate-cli

A lightweight, extensible command-line tool for querying and filtering data with support for operations like equality, range comparisons, inclusion, pattern matching, and more complex geospatial distance calculations, and fuzzy search. 

Includes interactive mode, customizable logic, and formatted outputs (table or JSON).

## Features

- **Query Operations**:
  - **Equality**: Filter by exact values.
  - **Range**: Filter by greater than, less than.
  - **Inclusion**: Check if a field includes specific values.
  - **Pattern Matching**: Check if text fields match certain patterns.
  - **Fuzzy Matching**: Find approximate matches in text fields using Levenshtein distance.
  - **Distance Filtering**: Filter data by geospatial distance.
- **Interactive Mode**: Step-by-step query building.
- **Export Results**: Save results to JSON files.
- **Flexible Output Formats**: Results displayed as a table or JSON.

---

## Development

### Setting Up Locally

Clone the repository:

```
git clone https://github.com/pabloandura/findstate-cli.git
cd findstate-cli
```

Install dependencies:

```
npm install
```

### Building the Project

Build the TypeScript code to JavaScript:

```
npm run build
```

### Running Tests

Run the unit tests:

```
npm test
```

---

## Commands

### `query`

Run a query with specified filters.

**Options**:
- `-q, --queries <queries...>`: Query filters in the format `field:operation:value`.
- `-s, --source <source>`: Data source. Default: `mock`.
- `-o, --output <output>`: Output format (`table` or `json`). Default: `table`.

**Example**:

```
findstate-cli query -q price:greaterThan:300000 -q rooms:equal:4
```

---

### `interactive`

Start interactive mode to build queries step by step.

**Options**:
- `-s, --source <source>`: Data source. Default: `mock`.
- `-o, --output <output>`: Output format (`table` or `json`). Default: `table`.

**Example**:

```
findstate-cli interactive
```

**Sample Interaction**:

```
> Enter field to query: price
> Select operation: greaterThan
> Enter value for the operation: 300000
> Do you want to add another query? (y/n): y
> Enter field to query: rooms
> Select operation: equal
> Enter value for the operation: 4
```

---

### `export`

Export query results to a file.

**Options**:
- `-q, --query <queries...>`: Queries to filter data.
- `-s, --source <source>`: Data source. Default: `mock`.
- `-f, --fileName <fileName>`: Output file name. Default: `results.json`.

**Example**:

```
findstate-cli export -q price:greaterThan:300000 -q rooms:equal:4 -f filteredResults.json
```

---

### `help`

Display usage information.

**Example**:

```
findstate-cli help
```

---

## Supported Query Operations

| **Operation**   | **Description**                                      | **Example Query**                     |
|------------------|------------------------------------------------------|---------------------------------------|
| `equal`         | Matches exact field value.                           | `rooms:equal:3`                       |
| `lessThan`      | Matches fields with values less than the provided.   | `price:lessThan:500000`               |
| `greaterThan`   | Matches fields with values greater than the provided.| `price:greaterThan:300000`            |
| `match`         | Matches fields containing a substring.               | `description:match:city`              |
| `fuzzy`         | Matches fields approximately similar to the value.   | `description:fuzzy:garage`            |
| `distance`      | Matches locations within a specific radius.          | `location:distance:40.7128,-74.0060,10`|
| `include`       | Checks if a field includes a specific property.       | `ammenities:include:pool`             |

---

## Fuzzy Matching

Fuzzy matching uses **Levenshtein distance** to find approximate matches for text fields. Matches within a distance of 3 are considered valid.

**Example**:

```
findstate-cli query -q description:fuzzy:garage
```

This query will return all properties with descriptions approximately matching the word `garage`.

