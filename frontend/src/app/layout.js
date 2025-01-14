
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Provider } from 'react-redux';
import { store } from '@/store/store';

import ClientProvider from "@/provider/clientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DEVlearn",
  description: "Your technology website",
  keywords: "tecnologia, programação, desenvolvimento, software, tutoriais, artigos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "DEVlearn - Seu site de tecnologia",
    description: "Descubra artigos, tutoriais e novidades sobre tecnologia.",
    url: "https://devlearn.com",
    images: [
      {
        url: "https://devlearn.com/Tech100px.png",
        alt: "Imagem de pré-visualização do site",
      },
    ],
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="Brasil" />
        <meta name="author" content="Cleverson Resende" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="no-referrer" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
