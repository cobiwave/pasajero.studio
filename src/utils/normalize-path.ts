export function normalizePathname(path: string): string {
  if (!path) return ''

  return path.replace(/\/$/u, '') // removes trailing slash if exists
}
