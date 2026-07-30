"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

interface LoadingGateProps {
  words: string[];
  subtitle: string;
}

export default function LoadingGate({ words, subtitle }: LoadingGateProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen words={words} onComplete={handleLoadingComplete} />
      <Hero loaded={loaded} subtitle={subtitle} />
    </>
  );
}
