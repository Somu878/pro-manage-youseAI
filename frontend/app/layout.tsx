import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Sidebar from "@/components/core/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pro Manage",
  description: "A Task Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Disabling for now since it is not stated in the problem statement */}
        {/* <Sidebar />  */}

        {children}
      </body>
    </html>
  );
}
