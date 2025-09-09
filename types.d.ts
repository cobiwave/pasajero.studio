interface Window {
  CustomEase: unknown;
  trustedTypes: unknown;
  fbAsyncInit: unknown;
  dataLayer: object[];
  MSStream: unknown;
  safari: unknown;
  fbq: unknown;
  FB: unknown;
  WM: unknown;
  lenis: Lenis;
}

// Webp
declare module '*.webp' {
  const value: string;
  export default value;
}

// VTT
declare module '*.vtt' {
  const value: string;
  export = value;
}
