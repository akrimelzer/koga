import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karoline & Andreas – 19. juni 2027",
  description: "Hold av datoen! Karoline og Andreas gifter seg 19. juni 2027 i Eidskog kirke.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body className={serif.className}>{children}</body>
    </html>
  );
}
