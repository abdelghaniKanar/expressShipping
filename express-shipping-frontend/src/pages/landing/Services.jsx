import React from "react";
import { Truck, PackageSearch, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: <Truck size={40} className="text-primary mb-4" />,
    title: "For Drivers",
    description: "Publish your trips, manage requests, and get paid easily.",
  },
  {
    icon: <PackageSearch size={40} className="text-primary mb-4" />,
    title: "For Shippers",
    description:
      "Find drivers, send delivery requests, and track your shipments.",
  },
  {
    icon: <ShieldCheck size={40} className="text-primary mb-4" />,
    title: "Secure & Verified",
    description: "Every user is verified for safety and trust.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white px-6 md:px-20 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            {service.icon}
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
