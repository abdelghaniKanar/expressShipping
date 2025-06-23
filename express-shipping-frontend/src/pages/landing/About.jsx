import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-white py-20 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/13/14/delivery-2026924_1280.png"
            alt="About ExpressShipping"
            className="w-full max-w-md rounded-xl shadow"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            ExpressShipping is a smart logistics platform that bridges the gap
            between shippers and drivers, offering a seamless experience to
            schedule, manage, and track shipping requests.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Whether you're a driver looking for deliveries or a shipper
            searching for reliable transport, we’ve built tools tailored just
            for you — all secure, fast, and easy to use.
          </p>
          <p className="text-gray-700 font-medium mt-6">
            Join us today and simplify your logistics journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
