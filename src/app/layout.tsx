import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteUrl } from "@/lib/site-url";

const gaMeasurementId = "G-RFPK8H7HPF";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "副業の税金ざっくり診断",
    template: "%s | 副業の税金ざっくり診断"
  },
  description:
    "副業収入・経費・働き方から、確定申告や住民税の注意点をざっくり確認できる初心者向け情報サイトです。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
