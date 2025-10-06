import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black text-white py-0 h-[72px] flex items-center justify-center relative z-[50] rounded-2xl">
      <nav className="flex items-center w-full relative h-full">
        <div className="flex items-center gap-6 ml-10">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/aufgabe" className="hover:underline">
            Aufgaben
          </Link>
          <Link href="/aufgabenListe" className="hover:underline">
            Aufgaben Listen
          </Link>
        </div>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          Klingende Klavierschule
        </h1>
      </nav>
    </header>
  );
}
