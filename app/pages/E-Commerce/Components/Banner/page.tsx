"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick"; // 👈 for proper typing

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Banner() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const products = [
    {
      id: 1,
      title: "Best Furniture collection for your interior",
      subTitle: "welcome to chairs",
      image: "/Banner/banner_image.png",
    },
    {
      id: 2,
      title: "Best Furniture collection for your interior",
      subTitle: "welcome to chairs",
      image: "/Banner/banner_image.png",
    },
    {
      id: 3,
      title: "Best Furniture collection for your interior",
      subTitle: "welcome to chairs",
      image: "/Banner/banner_image.png",
    },
    {
      id: 4,
      title: "Best Furniture collection for your interior",
      subTitle: "welcome to chairs",
      image: "/Banner/banner_image.png",
    },
  ];

  return (
    <div className="lg:container ">
      <div className="slider-container slider_container w-full h-full bg-amber-100">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="banner_slide_item">
              <div className="banner_text">
                <p className="text-sm uppercase text-[#272343]">
                  {product.subTitle}
                </p>
                <h3 className="text-6xl font-bold text-[#272343] max-w-[631px] mb-5">
                  {product.title}
                </h3>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#029fae] text-white rounded-lg">
                  shop now <MoveRight />
                </button>
              </div>
              <div className="banner_image flex items-center justify-end">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
