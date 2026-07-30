import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <p className="text-primary font-mono text-sm mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
        Page not found
      </h1>
      <p className="text-foreground/60 text-lg mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold tracking-wider uppercase border border-foreground/10 hover:border-primary hover:bg-primary hover:text-background rounded-full px-8 py-4 transition-all duration-500"
      >
        Back to home
      </Link>
    </main>
  );
}
