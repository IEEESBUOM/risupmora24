// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "@/provider/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rise Up Mora",
  description:
    "Rise Up Mora is organized by IEEE Student branch of University of Moratuwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 0,
  //     },
  //   },
  // });

  return (
    <html lang="en">
      <body>
        {/* <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} /> */}
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
