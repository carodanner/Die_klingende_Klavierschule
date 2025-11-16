import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>
      <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Willkommen bei der klingenden Klavierschule
          </h1>
          <p className="mb-4">
            Dieses Pilotprojekt verbindet Klavierunterricht mit digitalen
            Medien. Alle klingenden Karten auf dieser Webseite sollen in
            Papierform im Unterricht gemeinsam mit einer Lehrperson genutzt
            werden und hier in der digitalen Ebene nur beim häuslichen Üben zum
            Klingen gebracht werden.
          </p>

          <p>
            Eine Einführung in das Konzept und die Funktionsweise von „Die
            klingende Klavierschule“ befindet sich im Karteikasten unter dem
            Titel „So funktioniert die Klavierschule“.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
