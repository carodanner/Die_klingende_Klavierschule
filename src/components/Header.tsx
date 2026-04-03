import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-black text-white relative z-[50] rounded-2xl px-4 py-3 md:py-0 md:h-[72px]">
      <nav className="flex flex-col gap-3 items-center w-full relative h-full md:flex-row md:justify-start">
        <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <Image
            src="/images/logo.webp"
            alt="Klingende Klavierschule Logo"
            height={50}
            width={280}
            priority
            className="h-10 w-auto md:h-[50px]"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 md:ml-10">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/aufgabe" className="hover:underline">
            Klingende Karten
          </Link>
          <Link href="/aufgabenListe" className="hover:underline">
            Karteikasten
          </Link>
        </div>
      </nav>
    </header>
  );
}
