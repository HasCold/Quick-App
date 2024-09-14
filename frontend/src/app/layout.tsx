import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Quick Chat App",
  description: "Chatting quick as possible",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} antialiased`}
        >
        <Toaster richColors duration={10000} /> 
        {children}
      </body>
    </html>
    </SessionProvider>
  );
}
