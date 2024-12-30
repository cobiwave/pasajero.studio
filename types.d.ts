interface Window {
  CustomEase: any;
  trustedTypes: any;
  fbAsyncInit: any;
  dataLayer: object[];
  MSStream: any;
  safari: any;
  fbq: any;
  FB: any;
  WM: any;
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
