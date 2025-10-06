import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ImpressumPage() {
  return (

<div className="min-h-screen flex flex-col">
  <div className="max-w-7xl mx-auto w-full">
    <Header />
  </div>

    <main className="max-w-7xl mx-auto w-full flex-1 mt-5">

    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>
      <p>
        <strong>Angaben gemäß § 5 TMG</strong>
        <br />
        Max Mustermann
        <br />
        Musterstraße 1<br />
        12345 Musterstadt
        <br />
      </p>
      <p className="mt-4">
        <strong>Kontakt</strong>
        <br />
        Telefon: 01234 / 567890
        <br />
        E-Mail: info@klingende-klavierschule.de
      </p>
      <p className="mt-4">
        <strong>Vertreten durch:</strong>
        <br />
        Max Mustermann
      </p>
      <p className="mt-4">
        <strong>Haftungsausschluss:</strong>
        <br />
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen.
      </p>
      </div>
    </main>


  <Footer />
</div>   

  );
}
