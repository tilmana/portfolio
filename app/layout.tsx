import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { config, THEMES } from "@/lib/config";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${config.name} | ${config.title}`,
  description: config.metaDescription,
  metadataBase: new URL(config.siteUrl),
  openGraph: {
    title: `${config.name} | ${config.title}`,
    description: config.metaDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} | ${config.title}`,
    description: config.metaDescription,
  },
  other: {
    generator: "cli-portfolio",
  },
};

const palette = THEMES[config.theme];
const themeVars = {
  "--color-primary": palette.primary,
  "--color-accent":  palette.accent,
  "--color-dim":     palette.dim,
  "--color-edge":    palette.edge,
  "--color-surface": palette.surface,
  "--color-base":    palette.base,
  "--color-content": palette.content,
  "--color-warn":    palette.warn,
  "--color-danger":  palette.danger,
} as React.CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={themeVars} className={`${jetbrainsMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full antialiased">{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
