import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-black text-white py-0 h-[72px] flex items-center justify-center relative z-[50] rounded-2xl">
      <nav className="flex items-center w-full relative h-full">
        <div className="flex items-center gap-6 ml-10">
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logo.webp"
            alt="Klingende Klavierschule Logo"
            height={50}
            width={280} // Adjust width as needed to keep aspect ratio
            priority
            style={{ height: "50px", width: "auto" }}
          />
        </div>
      </nav>
    </header>
  );
}
