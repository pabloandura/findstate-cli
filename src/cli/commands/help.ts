export function helpCommand(): void {
    console.info(`
  Usage: findstate-cli [command] [options]
  
  Commands:
    query          Run a query using filters (e.g., price:greaterThan:300000)
    interactive    Start an interactive mode to build queries step by step
    help           Display detailed usage information
  
  Options:
    -q, --queries  Specify query filters (field:operation:value)
    -s, --source   Specify data source (default: "mock")
    -o, --output   Specify output format (table or json)
  
  Examples:
    findstate-cli query -q price:greaterThan:300000 -q rooms:greaterThan:3
    findstate-cli interactive
    findstate-cli query -q location:distance:40.7128,-74.0060,10 -o json
    `);
  }
  