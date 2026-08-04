import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MusicProvider } from "@/components/MusicProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Emily's Blog",
    template: "%s · Emily's Blog",
  },
  description: "记录技术、法律、生活、成长与自我观察的个人博客。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <MusicProvider>
          <Header />
          {children}
          <Footer />
        </MusicProvider>
      </body>
    </html>
  );
}
