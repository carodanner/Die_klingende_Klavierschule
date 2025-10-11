import React from "react";
import "./globals.css";
import Fathom from "@/components/Fathom";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Fathom />
        {children}
      </body>
    </html>
  );
}
