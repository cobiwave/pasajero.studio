export function createSafeHtmlId(input: string): string {
  return input
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[^\d_a-z-]+/gu, '-') // Replace invalid characters with hyphens
    .replace(/--+/gu, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/gu, '') // Remove leading/trailing hyphens
}
