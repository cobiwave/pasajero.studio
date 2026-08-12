import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <p>404</p>
      <h1>
        Page not found
      </h1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        Back to home
      </Link>
    </main>
  );
}
