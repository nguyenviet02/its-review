import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/providers/SessionProvider";
import QueryClientProviderWrapper from "@/providers/QueryClientProvider";
import LocalizationProviderWrapper from "@/providers/LocalizationProvider";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "ITS Review",
  description: "ITS Review",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${montserrat.variable} h-full text-text-dark`}>
        <QueryClientProviderWrapper>
          <SessionProviderWrapper>
            <LocalizationProviderWrapper>
              {children}
            </LocalizationProviderWrapper>
          </SessionProviderWrapper>
        </QueryClientProviderWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
