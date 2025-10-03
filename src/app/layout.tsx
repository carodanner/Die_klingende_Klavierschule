import React from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", background: "#f5f5f5" }}>
          <h1>Klingende Klavierschule</h1>
        </header>
        <nav style={{ padding: "1rem", background: "#e0e0e0" }}>
          <Link href="/">Home</Link> | <Link href="/aufgabe">Aufgaben</Link> |{" "}
          <Link href="/aufgabenListe">Aufgaben Listen</Link>
        </nav>
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
