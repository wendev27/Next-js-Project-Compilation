"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

// dynamically import react-slick (avoids SSR issues)
const Slider = dynamic(() => import("react-slick"), { ssr: false });

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Features() {
  const features = [
    {
      title: "library stool",
      status: "New",
      price: "$250",
      image: "/features/product_1.png",
      currentPrice: "$200",
    },
    {
      title: "library stool Chair",
      status: "Sales",
      price: "$250",
      image: "/features/product_2.png",
    },
    {
      title: "library stool Chair",
      status: "New",
      price: "$250",
      image: "/features/product_3.png",
    },
    {
      title: "library stool Chair",
      status: "New",
      price: "$250",
      image: "/features/product_4.png",
      currentPrice: "$200",
    },
    {
      title: "library stool",
      status: "New",
      price: "$250",
      image: "/features/product_1.png", // ✅ fixed path
      currentPrice: "$200",
    },
    {
      title: "library stool Chair",
      status: "Sales",
      price: "$250",
      image: "/features/product_2.png", // ✅ fixed path
    },
    {
      title: "library stool Chair",
      price: "$250",
      image: "/features/product_3.png", // ✅ fixed path
    },
    {
      title: "library stool Chair",
      status: "New",
      price: "$250",
      image: "/features/product_4.png", // ✅ fixed path
      currentPrice: "$200",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div>
      <div className={`w-full flex items-center justify-center`}>
        <h3 className={`text-3xl text-[#272343] font-semibold font-inter `}>
          Top Selling
        </h3>
      </div>
      <div className="lg:container mx-auto">
        <div className="slider-container features_slider w-full h-full text-black capitalize font-inter font-normal mb-4">
          <Slider {...settings}>
            {features.map((feature, index) => (
              <div key={index} className="p-4">
                {/* feature image */}
                <div className="feature_image mb-4 relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {feature.status && (
                    <div className="absolute top-4 left-4 bg-[#007580] text-white px-2 py-1 rounded-lg">
                      <span className="text-sm font-inter font-normal">
                        {feature.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* feature content */}
                <div className="feature_content">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base">{feature.title}</h4>

                    <p className="text-xl flex items-center gap-2 text-[#272343] font-semibold font-inter mb-4">
                      {feature.currentPrice && (
                        <span className="text-sm text-[#9a9caa] font-inter font-normal line-through">
                          {feature.price}
                        </span>
                      )}
                      <span>{feature.currentPrice || feature.price}</span>
                    </p>

                    <span className="bg-[#007580] h-[44px] w-[44px] rounded-lg flex items-center justify-center cursor-pointer">
                      <ShoppingCart className="text-white" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Features;
