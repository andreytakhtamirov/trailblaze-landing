"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAppPage = pathname === '/app';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <Lines />
          {/* Render Header only if the route is not /app */}
          {!isAppPage && <Header />}
          <ToasterContext />
          {children}
          {!isAppPage &&
            <Footer />}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
