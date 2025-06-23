import React from "react";
import Hero from "./landing/Hero";
import About from "./landing/About";
import Services from "./landing/Services";
import Contact from "./landing/Contact";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      <section className="py-10 bg-gray-100 text-center">
        <p className="text-gray-600 text-sm uppercase mb-4">Trusted by</p>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Telecom_Paris.svg"
            className="h-10"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Logo_Transport_Logistics.png"
            className="h-10"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/MIT_logo.svg"
            className="h-10"
          />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
