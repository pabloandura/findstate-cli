# searchstate-cli

A lightweight, extensible command-line tool for querying and filtering data with support for advanced operations like equality, range comparisons, inclusion, pattern matching, and geospatial distance calculations. Perfect for datasets with complex querying needs. Includes interactive mode, customizable logic, and formatted outputs (table or JSON). Ideal for developers and data analysts.

## Features

- Support for operations like:
  - **Equality**: Filter by exact values.
  - **Range**: Filter by greater than, less than.
  - **Inclusion**: Check if a field includes specific values.
  - **Pattern Matching**: Check if text fields match certain patterns.
  - **Distance Filtering**: Filter data by geospatial distance.
- Interactive query mode.
- Flexible and composable query logic.
- Outputs results in a table or JSON format.

## Installation

Install globally with npm:

```bash
npm install -g searchstate-cli
```

## Usage

### Basic Queries

Run the following to filter data using queries:

```bash
searchstate-cli query -q field:operation:value
```

**Example:**

Find data where the price is greater than 300000:

```bash
searchstate-cli query -q price:greaterThan:300000
```

### Interactive Mode

Start the CLI in interactive mode:

```bash
searchstate-cli interactive
```

**Example Output:**

```
> Enter field to query: price
> Select operation: greaterThan
> Enter value: 300000
> Add another query? (y/n): y
```

### Combining Queries

Combine multiple queries by chaining them with `-q`:

```bash
searchstate-cli query -q price:greaterThan:200000 -q description:match:garage
```

### Geospatial Filtering

Filter data by distance from a specific location:

```bash
searchstate-cli query -q location:distance:40.7128,-74.0060
```

### Exporting Results

Export results to a file:

```bash
searchstate-cli query -q price:greaterThan:200000 --export results.json
```

## Development

### Setting Up Locally

Clone the repository:

```bash
git clone https://github.com/pabloandura/searchstate-cli.git
cd searchstate-cli
```

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

### Building the Project

Build the TypeScript code to JavaScript:

```bash
npm run build
```

### Running Tests

Run the unit tests:

```bash
npm run test
```
