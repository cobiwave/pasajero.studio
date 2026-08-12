"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main>
      <p>Error</p>
      <h1>
        Something went wrong
      </h1>
      <p>
        An unexpected error occurred. Please try again.
      </p>
      <button onClick={reset}>
        Try again
      </button>
    </main>
  );
}
