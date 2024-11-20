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

## Usage

Run the CLI using the `findstate-cli` command followed by a subcommand and options.

---

### Example Queries

#### **Basic Queries**

1. **Find properties priced above $300,000:**

```bash
findstate-cli query -q price:greaterThan:300000
```

2. **Find properties with 3 or fewer bathrooms:**

```bash
findstate-cli query -q bathrooms:lessThan:4
```

3. **Find properties with exactly 4 rooms:**

```bash
findstate-cli query -q rooms:equal:4
```

4. **Find properties with "city" in the description:**

```bash
findstate-cli query -q description:match:city
```

---

#### **Advanced Queries**

1. **Find properties with more than 2 bathrooms and under $400,000:**

```bash
findstate-cli query -q bathrooms:greaterThan:2 -q price:lessThan:400000
```

2. **Find properties with at least 5 rooms and medium lighting:**

```bash
findstate-cli query -q rooms:greaterThan:4 -q lighting:equal:medium
```

3. **Find properties with a pool and a gym:**

```bash
findstate-cli query -q ammenities:include:pool -q ammenities:include:gym
```

4. **Find properties with a fireplace and fewer than 3 bathrooms:**

```bash
findstate-cli query -q ammenities:include:fireplace -q bathrooms:lessThan:3
```

---

#### **Geospatial Queries**

1. **Find properties within 10km of New York City (latitude: 40.7128, longitude: -74.0060):**

```bash
findstate-cli query -q location:distance:40.7128,-74.0060,10
```

2. **Find properties within 50km of San Francisco (latitude: 37.7749, longitude: -122.4194):**

```bash
findstate-cli query -q location:distance:37.7749,-122.4194,50
```

---

#### **Combination of Geospatial and Attribute Queries**

1. **Find properties within 20km of Los Angeles (latitude: 34.0522, longitude: -118.2437) with a pool:**

```bash
findstate-cli query -q location:distance:34.0522,-118.2437,20 -q ammenities:include:pool
```

2. **Find properties within 15km of Miami (latitude: 25.7617, longitude: -80.1918) and priced below $2,500,000:**

```bash
findstate-cli query -q location:distance:25.7617,-80.1918,15 -q price:lessThan:2500000
```

---

#### **Affordable Properties**

1. **Find properties priced below $200,000 with at least 3 rooms:**

```bash
findstate-cli query -q price:lessThan:200000 -q rooms:greaterThan:2
```

2. **Find properties under $150,000 with a yard:**

```bash
findstate-cli query -q price:lessThan:150000 -q ammenities:include:yard
```

---

#### **Luxury Properties**

1. **Find properties priced above $1,000,000 with a pool and gym:**

```bash
findstate-cli query -q price:greaterThan:1000000 -q ammenities:include:pool -q ammenities:include:gym
```

2. **Find properties priced over $2,000,000 with more than 5 rooms:**

```bash
findstate-cli query -q price:greaterThan:2000000 -q rooms:greaterThan:5
```

---

## Help

For detailed usage instructions, run:

```
findstate-cli help
```
