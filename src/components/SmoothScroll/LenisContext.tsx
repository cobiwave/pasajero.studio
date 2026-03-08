"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = LenisContext.Provider;

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
