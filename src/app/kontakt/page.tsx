import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex flex-col">
  <div className="max-w-7xl mx-auto w-full">
    <Header />
  </div>
  <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Kontakt</h1>
      <p>Sie können uns gerne kontaktieren:</p>
      <ul className="mt-4 list-disc list-inside">
        <li>Telefon: 01234 / 567890</li>
        <li>E-Mail: info@klingende-klavierschule.de</li>
        <li>Adresse: Musterstraße 1, 12345 Musterstadt</li>
      </ul>
    </div>
</main>
    
  <Footer />
</div>   
  );
}
