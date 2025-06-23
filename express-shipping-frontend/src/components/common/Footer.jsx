import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500 mt-10">
      © {new Date().getFullYear()} ExpressShipping. All rights reserved.
    </footer>
  );
};

export default Footer;
