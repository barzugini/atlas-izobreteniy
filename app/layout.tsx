import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Атлас изобретений",
  description:
    "Интерактивная карта изобретений, открытий и технологий человечества.",
  icons: {
    icon: "/atlas-izobreteniy/favicon.svg",
    shortcut: "/atlas-izobreteniy/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
