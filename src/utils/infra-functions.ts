export function isLocalhost() {
  if (typeof window === 'undefined') {
    // SSR environment
    return false;
  }
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}
