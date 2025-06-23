import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Ship smarter with{" "}
          <span className="text-primary">ExpressShipping</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Connect drivers with shippers across the country. Fast, reliable, and
          simple shipping.
        </p>
        <Link
          to="/register"
          className="inline-block bg-primary text-white py-3 px-6 rounded-lg shadow hover:bg-primary-dark transition"
        >
          Get Started
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://unblast.com/wp-content/uploads/2020/10/Fast-Shipping-Illustration.jpg"
          alt="Shipping illustration"
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default Hero;
