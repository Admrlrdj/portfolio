import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Public_Sans, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Intro } from "@/components/fx/Intro";
import { SideProgress } from "@/components/fx/SideProgress";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { profile } from "@/content/profile";
import { siteDescription, siteUrl } from "@/lib/seo";
import { langScript } from "@/lib/i18n";
import { T } from "@/components/i18n/T";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument", display: "swap" });
const sans = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-public", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-plex", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "700", variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — Full-stack developer`, template: `%s — ${profile.name}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: profile.name,
    title: `${profile.name} — Full-stack developer`,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
};

// Dijalankan sebelum cat pertama agar tema tersimpan tidak berkedip; default tetap terang.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}try{var d=document.documentElement;d.dataset.intro=location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches?"run":"skip";if(d.dataset.intro==="run"&&!location.hash){history.scrollRestoration="manual";scrollTo(0,0)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable} ${mono.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + langScript }} />
      </head>
      <body>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          <T id="Lompat ke konten" en="Skip to content" />
        </a>
        <Intro />
        <SmoothScroll />
        <SideProgress />
        <Header />
        <main id="konten">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
