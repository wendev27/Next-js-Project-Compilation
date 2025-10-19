"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { User } from "lucide-react";

export default function Reviews() {
  const clientSays = [
    {
      id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget.",
      name: "John Doe",
      position: "CEO, Company",
    },
    {
      id: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget.",
      name: "Jane Smith",
      position: "CTO, Startup",
    },
    {
      id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget.",
      name: "Alex Brown",
      position: "Manager, Agency",
    },
    {
      id: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, sit amet eget.",
      name: "Emma Wilson",
      position: "Founder, Brand",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="lg:container mx-auto ">
      <h3
        className={`text-3xl text-white font-semibold font-inter text-center py-7`}
      >
        Reviews
      </h3>
      <div className="slider-container w-full h-full py-20">
        <Slider {...settings}>
          {clientSays.map((client) => (
            <div
              key={client.id}
              className="p-20 border border-[#e1e1e3] rounded-lg "
            >
              <p className="text-2xl mb-4 text-[#636270] font-inter font-normal client_say_description">
                {client.description}
              </p>
              <div className="flex items-center gap-4">
                <User size="4rem" />
                <div>
                  <h4 className="text-2xl text-[#272343] font-inter font-medium capitalize mb-1.5">
                    {client.name}
                  </h4>
                  <p className="text-base text-[#9a9caa] font-inter capitalize font-normal">
                    {client.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
