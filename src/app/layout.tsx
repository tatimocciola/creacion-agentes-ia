import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Personal Stylist Agent", description: "Tu look diario, resuelto en menos de un minuto." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
