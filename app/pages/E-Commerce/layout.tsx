// app/ecommerce/layout.tsx
import Navbar from "./Components/Navbar/page";
import Footer from "./Components/Footer/page";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Ecommerce Navbar */}
      <Navbar />

      <main>{children}</main>

      {/* Ecommerce Footer */}
      <Footer />
    </>
  );
}
