"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import axios from "axios";
import Notification from "@/utils/notification";

import ClientProvider from "@/provider/clientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  // Configuração do Axios
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 429) {
        setNotification({
          message: error.response.data.message || "Você excedeu o limite de uso. Tente novamente mais tarde.",
          type: "error",
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <html lang="pt-br">
      <head>
        <title>DEVlearn</title>
        <meta name="description" content="Your technology website"/>
        <meta name="keywords" content="tecnologia, programação, desenvolvimento, software, tutoriais, artigos"/>
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="DEVlearn - Seu site de tecnologia"/>
        <meta property="og:description" content="Descubra artigos, tutoriais e novidades sobre tecnologia."/>
        <meta property="og:url" content="https://devlearn.com"/>
        <meta property="og:image" content="https://devlearn.com/Tech100px.png"/>
        <meta property="og:image:alt" content="Imagem de pré-visualização do site"/>
        <meta property="og:locale" content="pt_BR"/>

        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="Brasil" />
        <meta name="author" content="Cleverson Resende" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="no-referrer" />

        <link rel="icon" href="/Tech100px.png" type="image/png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          {notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: "", type: "" })}
            />
          )}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
