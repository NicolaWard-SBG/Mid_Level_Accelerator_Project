/**
 * Logs an error message to the console if not in a test environment.
 *
 * @param {string} message - The error message to log.
 * @param {Error} error - The error object to log.
 */

export const logError = (message, error) => {
  if (process.env.NODE_ENV !== "test") {
    // This way, errors are not logged during testing to avoid cluttering the console.
    console.error(message, error);
  }
};
