import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";
import { Home, User, Bell, CookingPot } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeApp",
  description: "Aplikasi Resep Masakan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <Head>
          <title>RecipeApp</title>
          <meta name="title" content="Recipe App" />
          <meta name="description" content="Aplikasi Resep Masakan" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <div
            className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white ${geistSans.variable} antialiased relative`}
          >
            <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold flex gap-4 justify-center items-center">
                  <CookingPot size={30} /> RecipeApp
                </h1>

                <div className="nav">
                  <ul className="flex gap-4">
                    <li>
                      <Link
                        className="flex gap-2 bg-slate-400 p-3 rounded-sm shadow-md font-semibold"
                        href="/recipes"
                      >
                        <Home /> Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex gap-2 bg-slate-400 p-3 rounded-sm shadow-md font-semibold"
                        href="/profile"
                      >
                        <User />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex gap-2 bg-slate-400 p-3 rounded-sm shadow-md font-semibold"
                        href="/notifications"
                      >
                        <Bell />
                        Notifications
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <main className="container mx-auto p-4">{children}</main>
          </div>
        </body>
      </html>
    </>
  );
}
