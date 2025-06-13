/**
 * Formats error responses in a consistent structure.
 * @param code HTTP status code
 * @param message Error message
 * @param details Array of error details
 */
export function formatError(code: number, message: string, details: string[]) {
  return {
    error: {
      code,
      message,
      details,
    },
  };
}
