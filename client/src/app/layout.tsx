import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Chat",
  description: "Chat em tempo real com socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
