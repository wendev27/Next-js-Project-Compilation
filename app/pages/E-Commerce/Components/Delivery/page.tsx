"use client";

import { Clock3, PercentDiamondIcon, ShieldCheck, Truck } from "lucide-react";

export default function Delivery() {
  return (
    <div className="lg:container mx-auto p-7">
      <div className="bg-white shadow-md p-7 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Discount */}
          <div className="delivery_wrapper">
            <div className="flex items-center gap-4 font-inter">
              <PercentDiamondIcon className="text-black" size="3rem" />
              <div>
                <h4 className="text-base text-black capitalize font-medium mb-2.5">
                  Discount
                </h4>
                <h5 className="text-sm text-black">Every week new sales</h5>
              </div>
            </div>
          </div>

          {/* Free Delivery */}
          <div className="delivery_wrapper">
            <div className="flex items-center gap-4 font-inter">
              <Truck className="text-black" size="3rem" />
              <div>
                <h4 className="text-base text-black capitalize font-medium mb-2.5">
                  Free Delivery
                </h4>
                <h5 className="text-sm text-black">100% Free for all orders</h5>
              </div>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="delivery_wrapper">
            <div className="flex items-center gap-4 font-inter">
              <Clock3 className="text-black" size="3rem" />
              <div>
                <h4 className="text-base text-black capitalize font-medium mb-2.5">
                  Support 24/7
                </h4>
                <h5 className="text-sm text-black">
                  We care about your experience
                </h5>
              </div>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="delivery_wrapper">
            <div className="flex items-center gap-4 font-inter">
              <ShieldCheck className="text-black" size="3rem" />
              <div>
                <h4 className="text-base text-black capitalize font-medium mb-2.5">
                  Secure Payment
                </h4>
                <h5 className="text-sm text-black">
                  100% Secure Payment Method
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
