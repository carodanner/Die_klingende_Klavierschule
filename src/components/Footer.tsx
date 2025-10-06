import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-black mt-5 pt-8 pb-4">
      <div className="max-w-[1440px] mx-auto px-8 md:px-40">
        <div className="section-box flex flex-col md:flex-row gap-8 md:gap-20 justify-between items-start mb-4 text-white p-5">
          <div className="flex flex-col gap-3 w-full md:w-1/4">
            <span className="font-bold text-lg">Weiteres</span>
            <div className="flex flex-col gap-2">
              <Link href={`/impressum`} className="hover:underline font-medium">
                Impressum
              </Link>
              <Link href={`/kontakt`} className="hover:underline font-medium">
                Kontakt
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/4"></div>
          <div className="flex flex-col gap-3 w-full md:w-1/4">
            © {year} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
