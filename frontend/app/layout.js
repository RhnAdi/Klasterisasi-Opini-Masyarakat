"use client";

import "../styles/globals.css";
import AppContext from "./AppContext";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [tfidf, setTfidf] = useState();
  const [is_stemming, setIsStemming] = useState(false);
  const [preprocessing, setPreprocessing] = useState([]);
  const [scraping, setScraping] = useState([]);
  const [action, setAction] = useState(false);
  const [clustering, setClustering] = useState();
  const [stopword, setStopword] = useState([]);
  return (
    <AppContext.Provider
      value={{
        state: {
          stopword,
          preprocessing,
          tfidf,
          is_stemming,
          scraping,
          action,
          clustering,
        },
        reducer: {
          setStopword,
          setTfidf,
          setIsStemming,
          setPreprocessing,
          setScraping,
          setAction,
          setClustering,
        },
      }}
    >
      <html lang="en">
        <head>
          <title>Penelitian PDP Tahun 2022 | Universitas Annur Purwodadi</title>
          <link rel="icon" href="/univ_annur_icon.png" type="image/x-icon" />
        </head>
        <body>{children}</body>
      </html>
    </AppContext.Provider>
  );
}
