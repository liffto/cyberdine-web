import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./font.css";
import AOSProvider from "@/providers/aos";
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });



const APP_NAME = "Cyber Dine";
const APP_DEFAULT_TITLE = "Cyber Dine";
const APP_TITLE_TEMPLATE = "%s - Cyber Dine";
const APP_DESCRIPTION =
  "Restraunt management solutions, 'best in business'";

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberdine.in"),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: APP_NAME,
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },

    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AOSProvider>
      <body className={inter.className}>{children}

      <GoogleTagManager gtmId={process.env.GAID!} />
      </body>
      </AOSProvider>
    </html>
  );
}
