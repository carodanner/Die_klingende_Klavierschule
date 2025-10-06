import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <div className="max-w-7xl mx-auto w-full">
            <Header />
          </div>
          <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
