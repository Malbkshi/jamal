import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MobileMenu from './mobile-menu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-32">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="منال جمال"
                width={360}
                height={120}
                className="w-auto h-16 md:h-32 object-contain"
                priority
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12 space-x-reverse">
              <Link
                href="/"
                className="text-gray-800 hover:text-primary-600 transition-colors text-2xl font-medium"
              >
                الرئيسية
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-primary-600 transition-colors text-2xl font-medium"
              >
                خدماتنا
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:text-primary-600 transition-colors text-2xl font-medium"
              >
                من نحن
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-primary-600 transition-colors text-2xl font-medium"
              >
                اتصل بنا
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-800 hover:text-primary-600 transition-colors p-2"
              aria-label="القائمة"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
} 