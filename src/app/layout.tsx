import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adelino B. Carvalho Instalações Elétricas Lda",
    template: "%s | Adelino B. Carvalho Instalações Elétricas",
  },
  description:
    "Mais de 50 anos de experiência em instalações elétricas residenciais, comerciais e industriais. Empresa constituída em 2002. Soluções elétricas seguras, eficientes e certificadas.",
  keywords: [
    "instalações elétricas",
    "eletricista",
    "quadros elétricos",
    "iluminação LED",
    "certificação elétrica",
    "Portugal",
  ],
  authors: [{ name: "Adelino B. Carvalho Instalações Elétricas Lda" }],
  creator: "Adelino B. Carvalho Instalações Elétricas Lda",
  metadataBase: new URL("https://adelinobcarvalho.pt"),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    title: "Adelino B. Carvalho Instalações Elétricas Lda",
    description:
      "Mais de 50 anos de experiência em instalações elétricas. Soluções seguras, eficientes e certificadas.",
    siteName: "Adelino B. Carvalho Instalações Elétricas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
