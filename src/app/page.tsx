import { Header } from "@components/molecules/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        123
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        FOOTER
      </footer>
    </div>
  );
}
