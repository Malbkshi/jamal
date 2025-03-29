import type { Metadata } from "next";
import { Playfair_Display, Lato, Cairo } from 'next/font/google';
// Remove these imports as we're now using optimized local fonts
// import "@fontsource/noto-sans-arabic/400.css";
// import "@fontsource/noto-sans-arabic/700.css";
// import "@fontsource/almarai/400.css";
// import "@fontsource/almarai/700.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';

// Initialize the Playfair Display font for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Initialize the Lato font for body text
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://manalaljamal.com'),
  title: "مركز منال الجمال للعناية بالبشرة وإزالة الشعر",
  description: "مركز متخصص في العناية بالبشرة وإزالة الشعر باستخدام أحدث التقنيات العالمية",
  // Improve SEO with additional metadata
  keywords: ["منال الجمال", "العناية بالبشرة", "إزالة الشعر", "ليبيا", "طرابلس", "تجميل"],
  authors: [{ name: "مركز منال الجمال" }],
  robots: "index, follow",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "مركز منال الجمال للعناية بالبشرة وإزالة الشعر",
    description: "مركز متخصص في العناية بالبشرة وإزالة الشعر في طرابلس، ليبيا",
    url: "https://manalaljamal.com",
    siteName: "مركز منال الجمال",
    locale: "ar_LY",
    type: "website",
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'مركز منال الجمال'
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${playfair.variable} ${lato.variable} ${cairo.variable} font-lato antialiased`}>
      <body className="font-lato antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
