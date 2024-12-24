import { Poppins } from "next/font/google";
import Header from "../components/header/header.js";
import { ModalProvider } from '../components/modalcontext.js';
import "../styles/globals.css";

const poppins = Poppins({ subsets: ["latin"], weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "cocktailapp",
  description: "cocktailapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ModalProvider>
        <body className={poppins.className}>
          <Header />
          <div className="container max-w-[1670px] mx-auto">
            {children}
          </div>
        </body>
      </ModalProvider>
    </html>
  );
}
