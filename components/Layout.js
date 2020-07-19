import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Ejemplo Apollo, Next.js y React</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-200 min-h-screen"></div>
      <div className="flex min-h-screen">
        <Sidebar />

        {children}
      </div>
    </>
  );
}
