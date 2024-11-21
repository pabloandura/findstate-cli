export function handleError(error: unknown): void {
    console.error("An error occurred:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
  