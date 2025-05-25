import type { Metadata } from "next";
import { Urbanist, Sacramento } from "next/font/google";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import "./globals.css";
import MainHeader from "@/app/components/ui/header/MainHeader";

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
});

const sacramento = Sacramento({ 
  subsets: ['latin'],
  weight: "400",
  variable: '--font-sacramento', 
});

export const metadata: Metadata = {
  title: {
    template: 'Recipes | %s',
    default: 'Recipes',
  },
  description: 'A collection of favorite family recipes',
  robots: 'noindex,nofollow',
};

/**
 * The website layout.
 * @constructor
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${sacramento.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > 
          <a href="#main-content" className="sr-only focus:not-sr-only">
            Skip to main content
          </a>
          <MainHeader />
          <main id="main-content" tabIndex={-1}>
            <div className="max-w-[1100px] px-4 md:px-6 py-6 mx-auto">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
