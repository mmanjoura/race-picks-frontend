import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Race Picks - Accurate Horse Racing Predictions",
  description: "Get precise horse racing predictions and insights using advanced algorithms. Make informed bets with Race Picks, your go-to app for race day success.",
  keywords: "horse racing, race predictions, betting tips, horse racing analytics, race day, betting strategies, horse racing app",
  author: "Your Name or Company",
  og: {
    title: "Race Picks - Accurate Horse Racing Predictions",
    description: "Predict the winners with confidence. Discover detailed analysis and insights for every race.",
    url: "https://yourappdomain.com",
    image: "https://yourappdomain.com/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Race Picks - Accurate Horse Racing Predictions",
    description: "Boost your race day success with expert horse racing predictions.",
    image: "https://yourappdomain.com/twitter-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
