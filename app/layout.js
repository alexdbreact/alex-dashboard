// app/layout.js
import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';


export const metadata = {
  title: " Admin Dashboard  ",
  description: "ديوان عام محافـــظة الإسكندريـــة", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer />
        </body>
    </html>
  );
}