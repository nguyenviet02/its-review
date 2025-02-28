import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/providers/SessionProvider";
import DialogStaffInfo from "@/components/admin/staff-management/DialogStaffInfo";
import QueryClientProviderWrapper from "@/providers/QueryClientProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
          <DialogStaffInfo />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
