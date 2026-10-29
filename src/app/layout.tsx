import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../style.css";

export const metadata: Metadata = {
  title: "Izakaya Oslo",
  description:
    "Japanske småretter og japansk drikke i St. Olavs gate 7, Oslo. Mandag–lørdag 17–01. Ingen reservasjoner. Bare kom.",
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/bodoni-moda.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
