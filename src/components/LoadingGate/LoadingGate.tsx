"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

interface LoadingGateProps {
  subtitle: string;
  socials: { label: string; href: string }[];
}

export default function LoadingGate({ subtitle, socials }: LoadingGateProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <Hero loaded={loaded} subtitle={subtitle} socials={socials} />
    </>
  );
}
