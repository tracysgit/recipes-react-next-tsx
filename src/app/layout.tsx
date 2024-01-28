import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import HeaderMain from "./components/header-main/header-main";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Recipes',
    default: 'Recipes',
  },
  description: 'A collection of favorite family recipes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} bg-white dark:bg-black`}> */}
      <body className={`${urbanist.className} bg-white dark:bg-black`}>
        <HeaderMain />
        <main>
          <div className="max-w-[1100px] px-4 md:px-6 py-6 md:py-10 lg:py-12 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
