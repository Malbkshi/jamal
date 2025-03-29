import { Almarai } from "next/font/google";
import localFont from "next/font/local";

// Next.js Google font with subset optimization
export const almarai = Almarai({
  weight: ["400", "700"],
  variable: "--font-almarai",
  subsets: ["arabic"],
  display: "swap", // Ensures text remains visible during font loading
});

// Local custom fonts - IBM Plex Sans Arabic
export const ibmPlex = localFont({
  src: [
    {
      path: "../../public/Fonts/IBMPlexSansArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Fonts/IBMPlexSansArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "700", 
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex",
  display: "swap",
}); 