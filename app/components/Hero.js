import React from "react";

const Hero = () => (
  <div className="relative overflow-hidden mb-2">
    {/* Uncomment and update the image source as needed */}
    <img src="/images/banners/banner_1.png" alt="Racecourse" className="w-full h-30 object-cover rounded-lg" />
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 p-4 text-white">
      {/* Content */}
    </div>
  </div>
);

export default Hero;