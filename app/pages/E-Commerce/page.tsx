// app/ecommerce/page.tsx
import Banner from "./Components/Banner/page";
import Delivery from "./Components/Delivery/page";
import Features from "./Components/Featured/page";
import Brand from "./Components/Brand/page";
import Shop from "./pages/Shop/page";
import Reviews from "./pages/Reviews/page";
import Recommendation from "./Components/Recommendation/page";

export default function EcommerceHome() {
  return (
    <>
      <section className="w-full min-h-[850px] bg-amber-100 flex items-center justify-center">
        <Banner />
      </section>
      <section className="delivery_component w-full min-h-[#150px]  shadow-m">
        <Delivery />
      </section>
      <section className="brand flex items-center h-[171px] justify-center w-full mt-8 mb-8">
        <Brand />
      </section>

      <div className="w-full flex items-center justify-center bg-amber-200 p-5">
        <Features></Features>
      </div>

      <div className="w-full flex items-center justify-center bg-amber-100 p-5">
        <Shop></Shop>
      </div>

      <div className="w-full flex items-center justify-center bg-gray-800 min-h-[589px] pb-[80px] pt-[80px]">
        <Reviews></Reviews>
      </div>

      <div className="w-full flex items-center justify-center min-h-[589px] pb-[80px] pt-[80px]">
        <Recommendation />
      </div>
    </>
  );
}
