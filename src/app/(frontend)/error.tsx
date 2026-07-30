"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <p className="text-primary font-mono text-sm mb-4">Error</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
        Something went wrong
      </h1>
      <p className="text-foreground/60 text-lg mb-10 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="text-sm font-semibold tracking-wider uppercase border border-foreground/10 hover:border-primary hover:bg-primary hover:text-background rounded-full px-8 py-4 transition-all duration-500"
      >
        Try again
      </button>
    </main>
  );
}
