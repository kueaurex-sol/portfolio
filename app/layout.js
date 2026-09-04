import { Tomorrow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Kue Aurex Sol",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${tomorrow.className} `}>
      <body>
        <LoadingScreen />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
