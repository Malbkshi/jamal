"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "خدماتنا", href: "/services" },
    { name: "عن العيادة", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md z-50 w-full fixed top-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32">
          {/* Desktop menu moved to the right */}
          <div className="hidden md:flex md:items-center md:space-x-4 md:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md text-lg font-medium font-ibm ${
                    isActive
                      ? "text-pink-600 font-bold"
                      : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/booking"
              className="mr-4 px-6 py-2 bg-pink-500 text-white rounded-full text-lg font-medium hover:bg-pink-600 transition-colors font-ibm"
            >
              احجزي موعدك الآن
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center -mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-pink-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo moved to the left */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="مركز منال الجمال"
                  width={120}
                  height={120}
                  className="ml-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-lg font-medium font-ibm ${
                pathname === link.href
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className="block w-full text-center mt-4 px-4 py-2 bg-pink-500 text-white rounded-full text-lg font-medium hover:bg-pink-600 transition-colors font-ibm"
          >
            احجزي موعدك الآن
          </Link>
        </div>
      </div>
    </nav>
  );
} 