# findstate-cli

A lightweight, extensible command-line tool for querying and filtering data with support for advanced operations like equality, range comparisons, inclusion, pattern matching, geospatial distance calculations, and fuzzy searching. Perfect for datasets with complex querying needs. Includes interactive mode, customizable logic, and formatted outputs (table or JSON). Ideal for developers and data analysts.

## Features

- Support for operations like:
  - **Equality**: Filter by exact values.
  - **Range**: Filter by greater than, less than.
  - **Inclusion**: Check if a field includes specific values.
  - **Pattern Matching**: Check if text fields match certain patterns.
  - **Distance Filtering**: Filter data by geospatial distance.
  - **Fuzzy Matching**: Find text fields with approximate matches.
- Interactive query mode.
- Flexible and composable query logic.
- Outputs results in a table or JSON format.

## Development

### Setting Up Locally

Clone the repository:

```bash
git clone https://github.com/pabloandura/findstate-cli.git
cd findstate-cli
```

Install dependencies:

```bash
npm install
```

### Building the Project

Build the TypeScript code to JavaScript:

```bash
npm run build
```

### Running Tests

Run the unit tests:

```bash
npm test
```


## Usage

### Basic Queries

Run the following to filter data using queries:

```bash
findstate-cli query -q field:operation:value
```

**Example:**

Find data where the price is greater than 300000:

```bash
findstate-cli query -q price:greaterThan:300000
```

### Combining Queries

Combine multiple queries by chaining them with `-q`:

```bash
findstate-cli query -q price:greaterThan:200000 -q description:match:garage
```

### Geospatial Filtering

Filter data by distance from a specific location:

```bash
findstate-cli query -q location:distance:40.7128,-74.0060,10
```

### Fuzzy Matching

Find data with fields approximately matching the provided value:

```bash
findstate-cli query -q description:fuzzy:garage
```

### Exporting Results

Export results to a file:

```bash
findstate-cli export -q price:greaterThan:200000
```

### Interactive Mode

Start the CLI in interactive mode:

```bash
findstate-cli interactive
```

**Example Output:**

```plaintext
> Enter field to query: price
> Select operation: greaterThan
> Enter value: 300000
> Add another query? (y/n): y
```


## Help

For detailed usage instructions, run:

```bash
findstate-cli help
```
