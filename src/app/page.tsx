import FilmGrain from "@/components/FilmGrain";
import LoadingGate from "@/components/LoadingGate";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <LoadingGate />
      <FilmGrain />
    </main>
  );
}
