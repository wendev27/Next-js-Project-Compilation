"use client";

import Image from "next/image";

export default function Brand() {
  const brands = [
    { id: 1, image: "/brands/brand_1.png" },
    { id: 2, image: "/brands/brand_2.png" },
    { id: 3, image: "/brands/brand_3.png" },
    { id: 4, image: "/brands/brand_4.png" },
    { id: 5, image: "/brands/brand_5.png" },
    { id: 6, image: "/brands/brand_6.png" },
    { id: 7, image: "/brands/brand_7.png" },
  ];

  return (
    <div className="lg:container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 items-center justify-center gap-5">
        {brands.map((brand) => (
          <div key={brand.id} className="brand_item flex justify-center">
            <Image
              src={brand.image}
              alt={`Brand ${brand.id}`}
              width={120} // you can adjust this
              height={60} // you can adjust this
              className="object-contain w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
